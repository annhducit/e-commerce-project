package com.anhducdt.ecommerce_backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetails {
  private String paymentMethod;
  private String paymentStatus;
  private String paymentId;
  private String razorpayPaymentLinkId;
  private String razorpayPaymentLinkReferenceId;
  private String razorpayPaymentLinkStatus;
  private String razorpayPaymentId;



}
