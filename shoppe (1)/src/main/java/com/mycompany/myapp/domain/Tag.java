package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`tag`")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "status")
    private Integer status;

    public Tag() {
    }

    public Tag(Integer status) {
        this.status = status;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Tag{" +
            "tagId=" + tagId +
            ", status=" + status +
            '}';
    }
}
