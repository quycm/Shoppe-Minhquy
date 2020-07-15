package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutRepository extends JpaRepository<About,Long> {

}
