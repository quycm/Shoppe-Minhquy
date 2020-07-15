package com.mycompany.myapp.repository;


import com.mycompany.myapp.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "SELECT p FROM Product p WHERE 1 = 1 AND :productName IS NULL or p.productName like %:productName% AND :status IS NULL or p.status = :status")
    Page<Product> filter (@Param("productName") String productName, @Param("status") Integer status, Pageable pageable);

    @Query(value = "select p from Product p where :productName is null or p.productName = :productName and p.status = 1 ")
    Optional<Product> findByProductName (@Param("productName")String productName);
}
