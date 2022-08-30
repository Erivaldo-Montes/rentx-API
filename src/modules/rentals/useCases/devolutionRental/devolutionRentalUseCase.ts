import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute({ user_id, id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);

    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("rental does not exist");
    }

    const dateNow = this.dayjsDateProvider.dateNow();

    let daily = this.dayjsDateProvider.compareInDays(
      rental.start_date,
      this.dayjsDateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }
    const delay = this.dayjsDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay < 0) {
      const calculate_amount = delay * car.fine_amount;
      total = calculate_amount;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dayjsDateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
