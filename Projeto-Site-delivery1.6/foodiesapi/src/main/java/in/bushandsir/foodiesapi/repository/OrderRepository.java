package in.bushandsir.foodiesapi.repository;


import in.bushandsir.foodiesapi.entity.OrderEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity,String> {

 List<OrderEntity> findByUserId(String userId);

 Optional<OrderEntity> findByPaymentId(String paymentId);


 Optional<OrderEntity> findByMercadopagoPaymentId(String mercadopagoPaymentId);

 Optional<OrderEntity> findByMercadopagoPreferenceId(String mercadopagoPreferenceId);

 List<OrderEntity> findByUserIdAndPaymentStatus(String userId, String paymentStatus);
}
