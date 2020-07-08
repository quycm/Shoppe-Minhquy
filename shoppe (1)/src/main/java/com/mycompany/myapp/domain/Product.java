package com.mycompany.myapp.domain;



import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "`product`")
public class Product extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "description")
    private String description;

    @Column(name = "product_image")
    private String productImage;

    @Column(name = "price")
    private Double price;

    @Column(name = "promotion_price")
    private Double promotionPrice;

    @Column(name = "include_vat")
    private Byte includeVat;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "detail")
    private String detail;

    @Column(name = "warranty")
    private Integer warranty;

    @Column(name = "status")
    private Integer status;

    @Column(name = "top_hot")
    private Date topHot;

    @Column(name = "view_count")
    private Integer viewCount;

    public Product() {
    }

    public Product(String productCode, String productName, String metaTitle, String description, String productImage, Double price, Double promotionPrice, Byte includeVat, Integer quantity, Long categoryId, String detail, Integer warranty, Integer status, Date topHot, Integer viewCount) {
        this.productCode = productCode;
        this.productName = productName;
        this.metaTitle = metaTitle;
        this.description = description;
        this.productImage = productImage;
        this.price = price;
        this.promotionPrice = promotionPrice;
        this.includeVat = includeVat;
        this.quantity = quantity;
        this.categoryId = categoryId;
        this.detail = detail;
        this.warranty = warranty;
        this.status = status;
        this.topHot = topHot;
        this.viewCount = viewCount;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
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

    public Byte getIncludeVat() {
        return includeVat;
    }

    public void setIncludeVat(Byte includeVat) {
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

    @Override
    public String toString() {
        return "Product{" +
            "productId=" + productId +
            ", productCode='" + productCode + '\'' +
            ", productName='" + productName + '\'' +
            ", metaTitle='" + metaTitle + '\'' +
            ", description='" + description + '\'' +
            ", productImage='" + productImage + '\'' +
            ", price=" + price +
            ", promotionPrice=" + promotionPrice +
            ", includeVat=" + includeVat +
            ", quantity=" + quantity +
            ", categoryId=" + categoryId +
            ", detail='" + detail + '\'' +
            ", warranty=" + warranty +
            ", status=" + status +
            ", topHot=" + topHot +
            ", viewCount=" + viewCount +
            '}';
    }
}
