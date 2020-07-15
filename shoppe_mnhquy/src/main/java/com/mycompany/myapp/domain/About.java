package com.mycompany.myapp.domain;


import javax.persistence.*;

@Entity
@Table(name = "`about`")
public class About extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "about_id")
    private Long aboutId;

    @Column(name = "title")
    private String title;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "detail")
    private String detail;

    @Column(name = "meata_keyword")
    private String metaKeyword;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "status")
    private Integer status;

    public About() {
    }

    public About(String title, String metaTitle, String description, String image, String detail, String metaKeyword, String metaDescription, Integer status) {
        this.title = title;
        this.metaTitle = metaTitle;
        this.description = description;
        this.image = image;
        this.detail = detail;
        this.metaKeyword = metaKeyword;
        this.metaDescription = metaDescription;
        this.status = status;
    }

    public Long getAboutId() {
        return aboutId;
    }

    public void setAboutId(Long aboutId) {
        this.aboutId = aboutId;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getMetaKeyword() {
        return metaKeyword;
    }

    public void setMetaKeyword(String metaKeyword) {
        this.metaKeyword = metaKeyword;
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

    @Override
    public String toString() {
        return "About{" +
            "aboutId=" + aboutId +
            ", title='" + title + '\'' +
            ", metaTitle='" + metaTitle + '\'' +
            ", description='" + description + '\'' +
            ", image='" + image + '\'' +
            ", detail='" + detail + '\'' +
            ", metaKeyword='" + metaKeyword + '\'' +
            ", metaDescription='" + metaDescription + '\'' +
            ", status=" + status +
            '}';
    }
}
