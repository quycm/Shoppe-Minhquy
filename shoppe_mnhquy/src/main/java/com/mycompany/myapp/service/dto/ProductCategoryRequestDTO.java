package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.ProductCategory;

public class ProductCategoryRequestDTO {
    private Long productCategoryId;


    private String name;


    private String metaTitle;


    private Long parentId;


    private Integer displayOrder;


    private String seoTitle;


    private String metaKeyWords;


    private String metaDescription;


    private Integer status;


    private Integer showOnHome;


    private Long  productId;

    public ProductCategoryRequestDTO() {
    }

    public ProductCategoryRequestDTO(ProductCategory productCategory) {
        this.productCategoryId = productCategory.getProductCategoryId();
        this.name = productCategory.getName();
        this.metaTitle = productCategory.getMetaTitle();
        this.parentId = productCategory.getParentId();
        this.displayOrder = productCategory.getDisplayOrder();
        this.seoTitle = productCategory.getSeoTitle();
        this.metaKeyWords = productCategory.getMetaKeyWords();
        this.metaDescription = productCategory.getMetaDescription();
        this.status = productCategory.getStatus();
        this.showOnHome = productCategory.getShowOnHome();
        this.productId = productCategory.getProduct().getProductId();
    }

    public Long getProductCategoryId() {
        return productCategoryId;
    }

    public void setProductCategoryId(Long productCategoryId) {
        this.productCategoryId = productCategoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getSeoTitle() {
        return seoTitle;
    }

    public void setSeoTitle(String seoTitle) {
        this.seoTitle = seoTitle;
    }

    public String getMetaKeyWords() {
        return metaKeyWords;
    }

    public void setMetaKeyWords(String metaKeyWords) {
        this.metaKeyWords = metaKeyWords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getShowOnHome() {
        return showOnHome;
    }

    public void setShowOnHome(Integer showOnHome) {
        this.showOnHome = showOnHome;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
