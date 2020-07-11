package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OderDetail,Long> {

}
