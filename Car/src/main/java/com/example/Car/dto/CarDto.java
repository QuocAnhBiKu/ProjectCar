package com.example.Car.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDto {
    private Long id;
    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    @DateTimeFormat(pattern = "yyyy")
    private Date year;
    private MultipartFile image;
    private byte[] returnedImage;
}
