package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`tag`")
public class NewsTag extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_tag_id")
    private Long newsTagId;

    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "status")
    private Integer status;

    public NewsTag() {
    }

    public NewsTag(Long tagId, Integer status) {
        this.tagId = tagId;
        this.status = status;
    }

    public Long getNewsTagId() {
        return newsTagId;
    }

    public void setNewsTagId(Long newsTagId) {
        this.newsTagId = newsTagId;
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
        return "NewsTag{" +
            "newsTagId=" + newsTagId +
            ", tagId=" + tagId +
            ", status=" + status +
            '}';
    }
}
