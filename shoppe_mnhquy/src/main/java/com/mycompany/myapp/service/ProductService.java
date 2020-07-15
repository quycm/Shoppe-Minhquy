package com.mycompany.myapp.service;


import com.mycompany.myapp.domain.OderDetail;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.OderDetailRepository;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.service.dto.ProductRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OderDetailRepository orderDetailRepository;


    @Transactional
    public Optional<Product> findById (Long id){
        if(id == null){
            return Optional.empty();
        }
        return productRepository.findById(id);
    }

    @Transactional
    public Product create (ProductRequestDTO productRequestDTO){
        Product product = new Product();
        product.setProductName(productRequestDTO.getProductName());
        product.setDescription(productRequestDTO.getDescription());
        product.setDetail(productRequestDTO.getDetail());
        product.setIncludeVat(productRequestDTO.getIncludeVat());
        product.setMetaTitle(productRequestDTO.getMetaTitle());
        Optional<OderDetail> oderDetail = orderDetailRepository.findById(productRequestDTO.getOrderDetailId());
        product.setOderDetail(oderDetail.get());
        product.setPrice(productRequestDTO.getPrice());
        product.setProductImage(productRequestDTO.getProductImage());
        product.setPromotionPrice(productRequestDTO.getPromotionPrice());
        product.setQuantity(productRequestDTO.getQuantity());
        product.setStatus(1);
        product.setTopHot(productRequestDTO.getTopHot().toInstant());
        product.setViewCount(productRequestDTO.getViewCount());
        product.setWarranty(productRequestDTO.getWarranty());
        return productRepository.save(product);
    }

    @Transactional
    public Page<Product> filter (ProductRequestDTO productRequestDTO, Pageable pageable){

        return productRepository.filter(productRequestDTO.getProductName(),productRequestDTO.getStatus(),pageable);
    }

    @Transactional
    public List<Product> findAll() {
        return productRepository.findAll();

    }

    @Transactional
    public Optional<Product> update (ProductRequestDTO productRequestDTO){
        return Optional.of(productRepository.findById(productRequestDTO.getProductID())).filter(Optional::isPresent).map(Optional::get)
            .map(product -> {
                product.setProductName(productRequestDTO.getProductName());
                product.setDescription(productRequestDTO.getDescription());
                product.setDetail(productRequestDTO.getDetail());
                product.setPrice(productRequestDTO.getPrice());
                product.setProductImage(productRequestDTO.getProductImage());
                product.setPromotionPrice(productRequestDTO.getPromotionPrice());
                product.setQuantity(productRequestDTO.getQuantity());
                product.setTopHot(productRequestDTO.getTopHot().toInstant());
                product.setViewCount(productRequestDTO.getViewCount());
                product.setWarranty(productRequestDTO.getWarranty());
                return productRepository.save(product);
            });
    }

    @Transactional
    public Optional<Product> delete (Long id){
        return Optional.of(productRepository.findById(id))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(product -> {
                if(product.getStatus() == 1)
                {
                    product.setStatus(0);
                }else {
                    product.setStatus(1);
                }

                return productRepository.save(product);

            });
    }


    @Transactional
    public Optional<Product> findByName (String name){

        if(name == null){
            return Optional.empty();
        }

        return productRepository.findByProductName(name);

    }
}
