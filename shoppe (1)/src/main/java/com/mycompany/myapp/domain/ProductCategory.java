package com.mycompany.myapp.domain;


import javax.persistence.*;

@Entity
@Table(name = "`product_category`")
public class ProductCategory extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_category_id")
    private Long productCategoryId;

    @Column(name = "name")
    private String name;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "meta_key_words")
    private String metaKeyWords;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "status")
    private Integer status;

    @Column(name = "show_on_home")
    private Integer showOnHome;

    public ProductCategory() {
    }

    public ProductCategory(String name, String metaTitle, Long parentId, Integer displayOrder, String seoTitle, String metaKeyWords, String metaDescription, Integer status, Integer showOnHome) {
        this.name = name;
        this.metaTitle = metaTitle;
        this.parentId = parentId;
        this.displayOrder = displayOrder;
        this.seoTitle = seoTitle;
        this.metaKeyWords = metaKeyWords;
        this.metaDescription = metaDescription;
        this.status = status;
        this.showOnHome = showOnHome;
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

    @Override
    public String toString() {
        return "ProductCategory{" +
            "productCategoryId=" + productCategoryId +
            ", name='" + name + '\'' +
            ", metaTitle='" + metaTitle + '\'' +
            ", parentId=" + parentId +
            ", displayOrder=" + displayOrder +
            ", seoTitle='" + seoTitle + '\'' +
            ", metaKeyWords='" + metaKeyWords + '\'' +
            ", metaDescription='" + metaDescription + '\'' +
            ", status=" + status +
            ", showOnHome=" + showOnHome +
            '}';
    }
}
