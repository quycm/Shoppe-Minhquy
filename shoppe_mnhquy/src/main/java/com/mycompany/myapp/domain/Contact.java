package com.mycompany.myapp.domain;


import sun.plugin.dom.views.AbstractView;

import javax.persistence.*;

@Entity
@Table(name = "`contact`")
public class Contact extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id")
    private Long contactId;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    private Integer status;

    public Contact() {
    }

    public Contact(String content, Integer status) {
        this.content = content;
        this.status = status;
    }

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Contact{" +
            "contactId=" + contactId +
            ", content='" + content + '\'' +
            ", status=" + status +
            '}';
    }
}
