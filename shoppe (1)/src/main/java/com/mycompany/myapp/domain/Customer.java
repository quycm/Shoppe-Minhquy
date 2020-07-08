package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`customer`")
public class Customer extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "name")
    
}
