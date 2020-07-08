package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`slide`")
public class Slide extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slide_id")
    private Long sildeId;

    @Column(name = "image")
    private String image;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "link")
    private String link;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Integer status;

    public Slide() {
    }

    public Slide(String image, Integer displayOrder, String link, String description, Integer status) {
        this.image = image;
        this.displayOrder = displayOrder;
        this.link = link;
        this.description = description;
        this.status = status;
    }

    public Long getSildeId() {
        return sildeId;
    }

    public void setSildeId(Long sildeId) {
        this.sildeId = sildeId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Slide{" +
            "sildeId=" + sildeId +
            ", image='" + image + '\'' +
            ", displayOrder=" + displayOrder +
            ", link='" + link + '\'' +
            ", description='" + description + '\'' +
            ", status=" + status +
            '}';
    }
}
