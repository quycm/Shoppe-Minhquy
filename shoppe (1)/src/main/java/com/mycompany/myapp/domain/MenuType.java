package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "`menutype`")
public class MenuType extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_type_id")
    private Long menuTypeId;

    @Column(name = "menu_name")
    private String menuName;

    @Column(name = "status")
    private Integer status;

    public MenuType() {
    }

    public MenuType(String menuName, Integer status) {
        this.menuName = menuName;
        this.status = status;
    }

    public Long getMenuTypeId() {
        return menuTypeId;
    }

    public void setMenuTypeId(Long menuTypeId) {
        this.menuTypeId = menuTypeId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "MenuType{" +
            "menuTypeId=" + menuTypeId +
            ", menuName='" + menuName + '\'' +
            ", status=" + status +
            '}';
    }
}
