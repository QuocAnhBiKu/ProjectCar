package com.example.Cart.services.customer;

import com.example.Cart.dto.BookACarDto;
import com.example.Cart.dto.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars ();

    boolean bookAcar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);
}
