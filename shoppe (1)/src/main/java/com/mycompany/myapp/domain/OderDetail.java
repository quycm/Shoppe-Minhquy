package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`order_detail`")
public class OderDetail extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id")
    private Long orderDetailId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "address")
    private String address;

    @Column(name = "price")
    private String price;

    @Column(name = "total_price")
    private String totalPrice;

    @Column(name = "status")
    private Integer status;

    public OderDetail() {
    }

    public OderDetail(Long orderId, Long productId, Integer quantity, String fullName, String address, String price, String totalPrice, Integer status) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.fullName = fullName;
        this.address = address;
        this.price = price;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OderDetail{" +
            "orderDetailId=" + orderDetailId +
            ", orderId=" + orderId +
            ", productId=" + productId +
            ", quantity=" + quantity +
            ", fullName='" + fullName + '\'' +
            ", address='" + address + '\'' +
            ", price='" + price + '\'' +
            ", totalPrice='" + totalPrice + '\'' +
            ", status=" + status +
            '}';
    }
}
