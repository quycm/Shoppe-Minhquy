package com.mycompany.myapp.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "`news`")
public class News extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long newID;

    @Column(name = "title")
    private String title;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "description")
    private String description;

    @Column(name = "new_image")
    private String newImage;

    @Column(name = "new_category_id")
    private Integer newCategoryId;

    @Column(name = "detail")
    private String detail;

    @Column(name = "meta_key_words")
    private String metaKeyWords;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "status")
    private Integer status;

    @Column(name = "top_hot")
    private Date topHot;

    @Column(name = "view_count")
    private Integer viewCount;

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    @Column(name = "tag_id")
    private Integer tagId;

    public News() {
    }

    public News(String title, String metaTitle, String description, String newImage, Integer newCategoryId, String detail, String metaKeyWords, String metaDescription, Integer status, Date topHot, Integer viewCount, Integer tagId) {
        this.title = title;
        this.metaTitle = metaTitle;
        this.description = description;
        this.newImage = newImage;
        this.newCategoryId = newCategoryId;
        this.detail = detail;
        this.metaKeyWords = metaKeyWords;
        this.metaDescription = metaDescription;
        this.status = status;
        this.topHot = topHot;
        this.viewCount = viewCount;
        this.tagId = tagId;
    }

    public Long getNewID() {
        return newID;
    }

    public void setNewID(Long newID) {
        this.newID = newID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getNewImage() {
        return newImage;
    }

    public void setNewImage(String newImage) {
        this.newImage = newImage;
    }

    public Integer getNewCategoryId() {
        return newCategoryId;
    }

    public void setNewCategoryId(Integer newCategoryId) {
        this.newCategoryId = newCategoryId;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
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
        return "News{" +
            "newID=" + newID +
            ", title='" + title + '\'' +
            ", metaTitle='" + metaTitle + '\'' +
            ", description='" + description + '\'' +
            ", newImage='" + newImage + '\'' +
            ", newCategoryId=" + newCategoryId +
            ", detail='" + detail + '\'' +
            ", metaKeyWords='" + metaKeyWords + '\'' +
            ", metaDescription='" + metaDescription + '\'' +
            ", status=" + status +
            ", topHot=" + topHot +
            ", viewCount=" + viewCount +
            ", tagId=" + tagId +
            '}';
    }
}
