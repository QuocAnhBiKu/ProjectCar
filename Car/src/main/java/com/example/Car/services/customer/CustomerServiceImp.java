package com.example.Car.services.customer;

import com.example.Car.dto.BookACarDto;
import com.example.Car.dto.CarDto;
import com.example.Car.entity.BookACar;
import com.example.Car.entity.Car;
import com.example.Car.entity.User;
import com.example.Car.enums.BookCarStatus;
import com.example.Car.repository.BookACarRepository;
import com.example.Car.repository.CarRepository;
import com.example.Car.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookACarRepository bookACarRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public boolean bookAcar(BookACarDto bookACarDto) {
        Optional<Car> optionalCar = carRepository.findById(bookACarDto.getCarId());
        Optional<User> optionalUser = userRepository.findById(bookACarDto.getUserId());
        if(optionalCar.isPresent() && optionalUser.isPresent()){
            Car existingcar = optionalCar.get();
            BookACar bookACar = new BookACar();
            bookACar.setUser(optionalUser.get());
            bookACar.setCar(existingcar);
            // Chuyển đổi từ chuỗi định dạng ISO 8601 thành đối tượng Date
            bookACar.setFromDate(Date.from(bookACarDto.getFromDate().toInstant()));
            bookACar.setToDate(Date.from(bookACarDto.getToDate().toInstant()));
            bookACar.setBookCarStatus(BookCarStatus.PENDING);
            long diffInMilliSeconds = bookACarDto.getToDate().getTime() - bookACarDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds); // Sử dụng MILLISECONDS
            bookACar.setDays(days);
            bookACar.setPrice(existingcar.getPrice()* days);
            bookACarRepository.save(bookACar);
            return true;
        }
        return false;
    }

    @Override
    public CarDto getCarById(Long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookACarDto> getBookingsByUserId(Long userId) {
        return bookACarRepository.findAllByUserId(userId).stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }
}
