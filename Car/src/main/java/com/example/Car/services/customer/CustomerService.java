package com.example.Car.services.customer;

import com.example.Car.dto.BookACarDto;
import com.example.Car.dto.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars ();

    boolean bookAcar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);
}
