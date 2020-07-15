package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
    @Query(value = "SELECT p FROM ProductCategory p WHERE 1 = 1 AND :name IS NULL or p.name like %:name% AND :status IS NULL or p.status = :status")
    Page<ProductCategory> filter (@Param("name") String name, @Param("status") Integer status, Pageable pageable);

    @Query(value = "select p from ProductCategory p where :name is null or p.name = :name and p.status = 1 ")
    Optional<ProductCategory> findByProductCategoryName (@Param("name")String name);
}
