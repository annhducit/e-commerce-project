package com.anhducdt.ecommerce_backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;

public class PaymentInformation {
    @Column(name = "cardholder_name")
    private String cardholderName;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "expiration_Date")
    private LocalDate expirationDate;
    @Column(name = "cvv")
    private String cvv;

}

