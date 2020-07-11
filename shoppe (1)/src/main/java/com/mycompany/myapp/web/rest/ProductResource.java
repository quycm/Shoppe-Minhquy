package com.mycompany.myapp.web.rest;


import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.service.ProductService;
import com.mycompany.myapp.service.dto.ProductRequestDTO;
import com.mycompany.myapp.service.dto.ProductResponseDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.PageUtil;
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
import org.springframework.web.util.UriComponentsBuilder;


import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductResource {
    @Autowired
    private ProductService productService;

    @GetMapping("/product")
    public ResponseEntity<List<ProductResponseDTO>>  filter (ProductRequestDTO productRequestDTO, Pageable pageable){
        Page<ProductResponseDTO> page = productService.filter(productRequestDTO,pageable).map(ProductResponseDTO::new);
        HttpHeaders httpHeaders = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),page);

        return new ResponseEntity<>(page.getContent(),httpHeaders, HttpStatus.OK);

    }

    @PostMapping("/product")
    public ResponseEntity<ProductResponseDTO> create (@RequestBody ProductRequestDTO productRequestDTO) throws URISyntaxException {
        if(productRequestDTO.getProductID() != null){
            throw new BadRequestAlertException("NULL","Product","idexists");
        }
        ProductResponseDTO productResponseDTO = new ProductResponseDTO(productService.create(productRequestDTO));
        return ResponseEntity.created(new URI("api/product" + productRequestDTO.getProductID())).body(productResponseDTO);
    }

    @PutMapping("/product")
    public ResponseEntity<ProductResponseDTO> update (@RequestBody ProductRequestDTO productRequestDTO) throws URISyntaxException {

        Optional<Product> exisproduct = productService.findById(productRequestDTO.getProductID());
        if(!exisproduct.isPresent()){
            throw new BadRequestAlertException("ID doesn't exists!", "productManager", "idnotexists");
        }
        Optional<ProductResponseDTO> updateProduct = productService.update(productRequestDTO).map(ProductResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(updateProduct);
    }

    @PutMapping("/product/delete")
    public ResponseEntity<ProductResponseDTO> delete (@RequestParam Long id) throws URISyntaxException {
        Optional<Product> exisproduct = productService.findById(id);
        if(!exisproduct.isPresent()){
            throw new BadRequestAlertException("ID doesn't exists!", "productManager", "idnotexists");
        }
        Optional<ProductResponseDTO> deleteproduct = productService.delete(id).map(ProductResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(deleteproduct);
    }

    @GetMapping("product/name")
    public ResponseEntity<ProductResponseDTO> findByName (String name){
        return ResponseUtil.wrapOrNotFound(productService.findByName(name).map(ProductResponseDTO::new));
    }

}
