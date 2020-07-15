package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.service.ProductCategoryService;
import com.mycompany.myapp.service.dto.ProductCategoryRequestDTO;
import com.mycompany.myapp.service.dto.ProductCategoryResponseDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductCategoryResource {
    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping("/product-category")
    public ResponseEntity<List<ProductCategoryResponseDTO>> filter (ProductCategoryRequestDTO productCategoryRequestDTO, Pageable pageable){

        Page<ProductCategoryResponseDTO> page = productCategoryService.filter(productCategoryRequestDTO,pageable).map(ProductCategoryResponseDTO::new);
        HttpHeaders httpHeaders = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),page);
        return new ResponseEntity<>(page.getContent(),httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/product-categoty")
    public ResponseEntity<ProductCategoryResponseDTO> create (@RequestBody ProductCategoryRequestDTO productCategoryRequestDTO) throws URISyntaxException {

        if(productCategoryRequestDTO.getProductCategoryId() == null ){
            throw new BadRequestAlertException("NULL","ProductCategory","idexists");
        }
        ProductCategoryResponseDTO productCategoryResponseDTO = new ProductCategoryResponseDTO(productCategoryService.create(productCategoryRequestDTO));
        return ResponseEntity.created(new URI("api/product" + productCategoryRequestDTO.getProductCategoryId())).body(productCategoryResponseDTO);
    }

    @PutMapping("/product-category")
    public ResponseEntity<ProductCategoryResponseDTO> update (@RequestBody ProductCategoryRequestDTO productCategoryRequestDTO) throws URISyntaxException {

        Optional<ProductCategory> exisproduct = productCategoryService.findById(productCategoryRequestDTO.getProductCategoryId());
        if(!exisproduct.isPresent()){
            throw new BadRequestAlertException("ID doesn't exists!", "productManager", "idnotexists");
        }
        Optional<ProductCategoryResponseDTO> updateProduct = productCategoryService.update(productCategoryRequestDTO).map(ProductCategoryResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(updateProduct);
    }

    @PutMapping("/product-category/delete")
    public ResponseEntity<ProductCategoryResponseDTO> delete (@RequestParam Long id) throws URISyntaxException {
        Optional<ProductCategory> exisproduct = productCategoryService.findById(id);
        if(!exisproduct.isPresent()){
            throw new BadRequestAlertException("ID doesn't exists!", "productManager", "idnotexists");
        }
        Optional<ProductCategoryResponseDTO> deleteproduct = productCategoryService.delete(id).map(ProductCategoryResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(deleteproduct);
    }

    @GetMapping("product-category/name")
    public ResponseEntity<ProductCategoryResponseDTO> findByName (String name){
        return ResponseUtil.wrapOrNotFound(productCategoryService.findByName(name).map(ProductCategoryResponseDTO::new));
    }
}
