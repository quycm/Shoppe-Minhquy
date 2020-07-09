package com.mycompany.myapp.domain;


import javax.persistence.*;

@Entity
@Table(name = "`order`")
public class Order extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "messeage")
    private String message;

    @Column(name = "display")
    private Integer display;

    @Column(name = "status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "order_detail_order_detail_id", referencedColumnName = "order_detail_id")
    private OderDetail oderDetail;

    public Order() {
    }

    public Order(String fullname, String email, String phone, String address, String message, Integer display, Integer status, OderDetail oderDetail) {
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.message = message;
        this.display = display;
        this.status = status;
        this.oderDetail = oderDetail;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getDisplay() {
        return display;
    }

    public void setDisplay(Integer display) {
        this.display = display;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public OderDetail getOderDetail() {
        return oderDetail;
    }

    public void setOderDetail(OderDetail oderDetail) {
        this.oderDetail = oderDetail;
    }

    @Override
    public String toString() {
        return "Order{" +
            "orderId=" + orderId +
            ", fullname='" + fullname + '\'' +
            ", email='" + email + '\'' +
            ", phone='" + phone + '\'' +
            ", address='" + address + '\'' +
            ", message='" + message + '\'' +
            ", display=" + display +
            ", status=" + status +
            ", oderDetail=" + oderDetail +
            '}';
    }
}
