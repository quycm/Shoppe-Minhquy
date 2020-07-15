package com.mycompany.myapp.domain;


import javax.persistence.*;

@Entity
@Table(name = "`menu`")
public class Menu extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "text")
    private String text;

    @Column(name = "link")
    private String link;

    @Column(name = "display_order")
    private Integer displayOder;

    @Column(name = "target")
    private String target;


    @Column(name = "status")
    private Integer status;

    @Column(name = "menu_type_id")
    private Integer menuTypeId;

    @Column(name = "menu_parent_id")
    private Integer menuParentId;

    public Menu() {
    }

    public Menu(String text, String link, Integer displayOder, String target, Integer status, Integer menuTypeId, Integer menuParentId) {
        this.text = text;
        this.link = link;
        this.displayOder = displayOder;
        this.target = target;
        this.status = status;
        this.menuTypeId = menuTypeId;
        this.menuParentId = menuParentId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getDisplayOder() {
        return displayOder;
    }

    public void setDisplayOder(Integer displayOder) {
        this.displayOder = displayOder;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getMenuTypeId() {
        return menuTypeId;
    }

    public void setMenuTypeId(Integer menuTypeId) {
        this.menuTypeId = menuTypeId;
    }

    public Integer getMenuParentId() {
        return menuParentId;
    }

    public void setMenuParentId(Integer menuParentId) {
        this.menuParentId = menuParentId;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "menuId=" + menuId +
            ", text='" + text + '\'' +
            ", link='" + link + '\'' +
            ", displayOder=" + displayOder +
            ", target='" + target + '\'' +
            ", status=" + status +
            ", menuTypeId=" + menuTypeId +
            ", menuParentId=" + menuParentId +
            '}';
    }
}
