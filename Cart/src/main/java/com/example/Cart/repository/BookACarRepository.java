package com.example.Cart.repository;

import com.example.Cart.dto.BookACarDto;
import com.example.Cart.entity.BookACar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookACarRepository extends JpaRepository<BookACar , Long> {
    List<BookACar> findAllByUserId(Long userId);
}
