package in.bushandsir.foodiesapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhook")  // ✅ REMOVER O "S"
public class MercadoPagoWebhookController {

    @GetMapping("/test")  // ✅ ADICIONAR TESTE GET
    public Map<String, String> test() {
        return Map.of("status", "OK", "message", "Webhook funcionando!");
    }

    @PostMapping("/mercadopago")
    public ResponseEntity<String> handleWebhook(
            @RequestBody(required = false) Map<String, Object> payload,
            @RequestHeader(value = "x-signature", required = false) String signature) {

        System.out.println("=== 🎯 WEBHOOK RECEBIDO ===");
        System.out.println("📦 Payload: " + payload);
        System.out.println("🔐 Signature: " + signature);

        return ResponseEntity.ok("Webhook received successfully");
    }
}