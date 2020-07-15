package com.mycompany.myapp.service;


import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.repository.ProductCategoryRepository;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.service.dto.ProductCategoryRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductCategoryService {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Optional<ProductCategory> findById(Long id){
        if (id == null){
            return Optional.empty();
        }
        return productCategoryRepository.findById(id);
    }

    @Transactional
    public ProductCategory create (ProductCategoryRequestDTO productCategoryRequestDTO){
        ProductCategory productCategory = new ProductCategory();
        productCategory.setName(productCategoryRequestDTO.getName());
        productCategory.setMetaDescription(productCategoryRequestDTO.getMetaDescription());
        productCategory.setDisplayOrder(productCategoryRequestDTO.getDisplayOrder());
        productCategory.setMetaKeyWords(productCategoryRequestDTO.getMetaKeyWords());
        productCategory.setStatus(1);
        productCategory.setShowOnHome(productCategoryRequestDTO.getShowOnHome());
        Optional<Product> productId = productRepository.findById(productCategoryRequestDTO.getProductId());
        productCategory.setProduct(productId.get());

        return productCategoryRepository.save(productCategory);
    }

    @Transactional
    public Page<ProductCategory> filter (ProductCategoryRequestDTO productCategoryRequestDTO, Pageable pageable){
        return productCategoryRepository.filter(productCategoryRequestDTO.getName(), productCategoryRequestDTO.getStatus(),pageable);
    }

    @Transactional
    public List<ProductCategory> findAll (){
        return productCategoryRepository.findAll();
    }

    @Transactional
    public Optional<ProductCategory> update (ProductCategoryRequestDTO productCategoryRequestDTO){

        return Optional.of(productCategoryRepository.findById(productCategoryRequestDTO.getProductCategoryId())).filter(Optional::isPresent).map(Optional::get)
            .map(productCategory -> {

                productCategory.setName(productCategoryRequestDTO.getName());
                productCategory.setMetaDescription(productCategoryRequestDTO.getMetaDescription());
                productCategory.setDisplayOrder(productCategoryRequestDTO.getDisplayOrder());
                productCategory.setMetaKeyWords(productCategoryRequestDTO.getMetaKeyWords());
                productCategory.setShowOnHome(productCategoryRequestDTO.getShowOnHome());
                Optional<Product> productId = productRepository.findById(productCategoryRequestDTO.getProductId());
                productCategory.setProduct(productId.get());

                return productCategoryRepository.save(productCategory);});

    }

    @Transactional
    public Optional<ProductCategory> delete (Long id){
        return Optional.of(productCategoryRepository.findById(id)).filter(Optional::isPresent)
            .map(Optional::get)
            .map(productCategory -> {
                if(productCategory.getStatus() == 1){
                    productCategory.setStatus(0);
                }else {
                    productCategory.setStatus(1);
                }
                return productCategoryRepository.save(productCategory);
            });
    }

    @Transactional
    public Optional<ProductCategory> findByName (String name){
        if(name == null){
            return Optional.empty();
        }

        return productCategoryRepository.findByProductCategoryName(name);
    }
}
