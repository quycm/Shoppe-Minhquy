package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Product;
import org.springframework.format.annotation.DateTimeFormat;


import java.time.Instant;
import java.util.Date;

public class ProductRequestDTO {

    private Long productID;

    private String productName;

    private String metaTitle;


    private String description;


    private String productImage;


    private Double price;


    private Double promotionPrice;


    private Integer includeVat;


    private Integer quantity;


    private Long categoryId;


    private String detail;


    private Integer warranty;


    private Integer status;




    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date topHot;


    private Integer viewCount;

    private Long orderDetailId;

    public ProductRequestDTO() {
    }

    public ProductRequestDTO(Product product) {
        this.productID = product.getProductId();
        this.productName = product.getProductName();
        this.metaTitle = product.getMetaTitle();
        this.description = product.getDescription();
        this.productImage = product.getProductImage();
        this.price = product.getPrice();
        this.promotionPrice = product.getPromotionPrice();
        this.includeVat = product.getIncludeVat();
        this.quantity = product.getQuantity();
        this.categoryId = product.getCategoryId();
        this.detail = product.getDetail();
        this.warranty = product.getWarranty();
        this.status = product.getStatus();
        this.topHot = Date.from(product.getTopHot());
        this.viewCount = product.getViewCount();
        this.orderDetailId = product.getOderDetail().getOrderDetailId();
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPromotionPrice() {
        return promotionPrice;
    }

    public void setPromotionPrice(Double promotionPrice) {
        this.promotionPrice = promotionPrice;
    }

    public Integer getIncludeVat() {
        return includeVat;
    }

    public void setIncludeVat(Integer includeVat) {
        this.includeVat = includeVat;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Integer getWarranty() {
        return warranty;
    }

    public void setWarranty(Integer warranty) {
        this.warranty = warranty;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getTopHot() {
        return topHot;
    }

    public void setTopHot(Date topHot) {
        this.topHot = topHot;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }
}
