package com.anhducdt.ecommerce_backend.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement((sessionManagement) ->
                sessionManagement
                    .sessionConcurrency((sessionConcurrency) ->
                        sessionConcurrency
                            .maximumSessions(1)
                            .expiredUrl("/login?expired")
                    )
            )
            .securityMatchers((matchers) -> matchers
                .requestMatchers("/api/**")
            )
            .addFilterBefore(new JwtAuthFilter(), BasicAuthenticationFilter.class);
//            .authorizeHttpRequests((authorize) -> authorize
//                .requestMatchers("/api/auth/**").permitAll()
//                .requestMatchers("/api/products/**").permitAll()
//                .requestMatchers("/api/order/**").hasAuthority("Customer")
//                .requestMatchers("/api/users/**").hasAuthority("Customer")
//                .requestMatchers("/api/cart/**").hasAnyAuthority("Customer", "Admin")
//                .requestMatchers("/api/checkout/**").hasAuthority("Customer")
//                .requestMatchers(HttpMethod.GET, "/api/users/**").hasAnyAuthority("Customer", "Admin")
//
//
//                .requestMatchers(HttpMethod.GET, "/api/auth/**").permitAll()
//                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
//
//                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
//                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority("Admin")
//
//                .requestMatchers("/api/admin/orders").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.GET,"/api/admin/orders/**").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.POST,"/api/admin/orders/**").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.PUT,"/api/admin/orders/**").hasAuthority("Admin")
//                .requestMatchers(HttpMethod.DELETE,"/api/admin/orders/**").hasAuthority("Admin")
//
//                .requestMatchers("/api/admin/**").hasAuthority("Admin")
//            );

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
