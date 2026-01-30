# ✅ ENTERPRISE / PRODUCTION-GRADE SOFTWARE CHECKLIST

[Türkçe](#türkçe) | [English](#english)

---

## Türkçe

*(Deploy öncesi – PR Review – Release Gate)*

---

### 🧠 ALTIN KURAL (DEĞİŞMEZ)

* [ ] Aynı anda **1000 kullanıcı** yaparsa ne olur?
* [ ] Aynı işlem **iki kez çalışırsa** ne olur?
* [ ] İşlem **yarıda kalırsa** sistem ne yapar?

Bu üçüne net cevap yoksa → **prod’a çıkılmaz**.

---

### 1️⃣ Database & ORM

* [ ] N+1 yok
* [ ] SELECT * yok
* [ ] Composite index doğru
* [ ] OFFSET pagination büyük tabloda yok
* [ ] Cursor pagination → ORDER BY **unique**
* [ ] Soft delete filtreleniyor
* [ ] Transaction sınırları net
* [ ] Deadlock sırası tutarlı
* [ ] Long-running transaction yok
* [ ] Connection pool leak yok
* [ ] UTC standardı sabit

### 2️⃣ Performans

* [ ] O(n²) loop yok
* [ ] Gereksiz object copy yok
* [ ] Senkron I/O request içinde yok
* [ ] Payload minimal
* [ ] Profiling yapılmadan optimize edilmedi
* [ ] Batch boyutları mantıklı

### 3️⃣ Cache & Tutarlılık

* [ ] Cache stampede önlenmiş
* [ ] Hot key mitigasyonu var
* [ ] TTL mantıklı
* [ ] Cache invalidation doğru
* [ ] Cache warming stratejisi var
* [ ] Stale data tolere edilebilir mi belli

### 4️⃣ Concurrency & Paralellik

* [ ] Race condition yok
* [ ] Atomic operation gerekli yerde var
* [ ] Check-then-act yok
* [ ] Double submit engelli
* [ ] Idempotency key var
* [ ] Lock lease süreleri doğru

### 5️⃣ Distributed Systems

* [ ] Timeout tanımlı
* [ ] Retry limitli + backoff + jitter
* [ ] Circuit breaker var
* [ ] Half-open state test edildi
* [ ] Retry storm riski yok
* [ ] Thundering herd önlendi
* [ ] Clock skew (NTP) kontrolü var

### 6️⃣ API & Entegrasyon

* [ ] HTTP status doğru
* [ ] Validation server-side
* [ ] Error format standard
* [ ] API versioning var
* [ ] Deprecation + sunset policy var
* [ ] OpenAPI/Swagger güncel
* [ ] Rate limit var
* [ ] GraphQL depth/complexity limiti
* [ ] Webhook signature doğrulama
* [ ] Webhook retry exponential backoff
* [ ] 3rd-party API rate limit cache’leniyor

### 7️⃣ Security (Temel)

* [ ] SQL / NoSQL injection kapalı
* [ ] XSS escape var
* [ ] CSRF korunuyor
* [ ] AuthN ≠ AuthZ
* [ ] IDOR yok
* [ ] JWT expiry/refresh doğru
* [ ] Secrets koda gömülü değil
* [ ] Log’larda PII/token yok
* [ ] File upload MIME + size limitli

### 8️⃣ Frontend / Mobile

* [ ] Double submit engelli
* [ ] Loading / error / empty state var
* [ ] Offline senaryosu düşünüldü
* [ ] State tek source of truth
* [ ] Memory leak yok
* [ ] List virtualization var
* [ ] Permission flow sağlam
* [ ] Accessibility tamamen unutulmadı

### 9️⃣ Ödeme / Kritik Akışlar

* [ ] Idempotency zorunlu
* [ ] Webhook duplicate handling var
* [ ] Client’a güvenilmiyor
* [ ] Refund / rollback akışı var
* [ ] Entitlement cache stale senaryosu var

### 🔟 Test & Release

* [ ] Unit + integration test
* [ ] E2E kritik akışlar
* [ ] Flaky test yok
* [ ] Test data isolation var
* [ ] Feature flag ile deploy
* [ ] Flag cleanup planı var
* [ ] Rollback planı hazır
* [ ] Migration sırası doğru
* [ ] Healthcheck ayrımı net (liveness/readiness)

### 1️⃣1️⃣ Observability

* [ ] Exception yutulmuyor
* [ ] Log seviyeleri doğru
* [ ] Correlation ID var
* [ ] Metric (latency/error/saturation)
* [ ] Anlamlı alert’ler
* [ ] Alarm fırtınası yok

### 1️⃣2️⃣ Infrastructure & DevOps

* [ ] Container image scan (Trivy/Snyk)
* [ ] Non-root container
* [ ] Read-only filesystem
* [ ] CPU / memory limit tanımlı
* [ ] HPA/VPA cluster’ı boğmuyor
* [ ] Secret rotation var
* [ ] Config hot-reload
* [ ] Blue-green / canary deploy
* [ ] IaC drift kontrolü

### 1️⃣3️⃣ Veri & Compliance

* [ ] PII masking/anonymization
* [ ] GDPR/KVKK forget-me çalışıyor
* [ ] Retention policy otomatik
* [ ] Cross-region yasal mı?
* [ ] Backup şifreli
* [ ] Restore test edildi
* [ ] RTO / RPO net

### 1️⃣4️⃣ Maliyet & Optimizasyon

* [ ] Resource tagging var
* [ ] Unused resource temiz
* [ ] Cross-AZ/region cost farkında
* [ ] Log retention mantıklı
* [ ] Dev/test auto-shutdown

### 1️⃣5️⃣ Security (Derin)

* [ ] Dependency confusion önlemi
* [ ] SAST pipeline’da
* [ ] DAST pipeline’da
* [ ] Git history secret temiz
* [ ] Runtime security (Falco vb.)
* [ ] Network policy pod-to-pod
* [ ] SBOM üretiliyor

### 1️⃣6️⃣ Chaos & Dayanıklılık

* [ ] Pod ölünce sistem ayakta
* [ ] Network latency test edildi
* [ ] Partial failure tolere ediliyor
* [ ] Data integrity checksum var
* [ ] Graceful degradation var

---

## English

*(Pre-deploy – PR Review – Release Gate)*

---

### 🧠 GOLDEN RULE (IMMUTABLE)
* [ ] What happens if **1000 users** do this simultaneously?
* [ ] What happens if the same operation **runs twice**?
* [ ] What does the system do if the operation **stops midway**?
If no clear answer to these three → **do not deploy to prod**.

---

### 1️⃣ Database & ORM
* [ ] No N+1 queries
* [ ] No SELECT *
* [ ] Correct composite indexes
* [ ] No OFFSET pagination on large tables
* [ ] Cursor pagination → ORDER BY **unique**
* [ ] Soft delete is filtered
* [ ] Transaction boundaries are clear
* [ ] Consistent deadlock order
* [ ] No long-running transactions
* [ ] No connection pool leaks
* [ ] Fixed UTC standard

### 2️⃣ Performance
* [ ] No O(n²) loops
* [ ] No unnecessary object copies
* [ ] No synchronous I/O within requests
* [ ] Minimal payload
* [ ] No optimization without profiling
* [ ] Logical batch sizes

### 3️⃣ Cache & Consistency
* [ ] Cache stampede prevented
* [ ] Hot key mitigation in place
* [ ] Logical TTL
* [ ] Correct cache invalidation
* [ ] Cache warming strategy
* [ ] Tolerance for stale data is defined

### 4️⃣ Concurrency & Parallelism
* [ ] No race conditions
* [ ] Atomic operations where necessary
* [ ] No check-then-act patterns
* [ ] Double submit prevented
* [ ] Idempotency keys implemented
* [ ] Correct lock lease durations

### 5️⃣ Distributed Systems
* [ ] Timeouts defined
* [ ] Limited retries + backoff + jitter
* [ ] Circuit breaker implemented
* [ ] Half-open state tested
* [ ] No retry storm risk
* [ ] Thundering herd prevented
* [ ] Clock skew (NTP) checked

### 6️⃣ API & Integration
* [ ] Correct HTTP status codes
* [ ] Server-side validation
* [ ] Standard error format
* [ ] API versioning in place
* [ ] Deprecation + sunset policy defined
* [ ] OpenAPI/Swagger up to date
* [ ] Rate limiting implemented
* [ ] GraphQL depth/complexity limits
* [ ] Webhook signature verification
* [ ] Webhook retry with exponential backoff
* [ ] 3rd-party API rate limits cached

### 7️⃣ Security (Basic)
* [ ] SQL / NoSQL injection prevented
* [ ] XSS escaping implemented
* [ ] CSRF protection in place
* [ ] AuthN ≠ AuthZ
* [ ] No IDOR vulnerabilities
* [ ] Correct JWT expiry/refresh
* [ ] Secrets not hardcoded
* [ ] No PII/tokens in logs
* [ ] File upload MIME + size limited

### 8️⃣ Frontend / Mobile
* [ ] Double submit prevented
* [ ] Loading / error / empty states implemented
* [ ] Offline scenarios considered
* [ ] State has a single source of truth
* [ ] No memory leaks
* [ ] List virtualization implemented
* [ ] Robust permission flow
* [ ] Accessibility not forgotten

### 9️⃣ Payment / Critical Flows
* [ ] Idempotency mandatory
* [ ] Webhook duplicate handling
* [ ] Client not trusted
* [ ] Refund / rollback flows defined
* [ ] Entitlement cache stale scenarios handled

### 🔟 Test & Release
* [ ] Unit + integration tests
* [ ] E2E for critical flows
* [ ] No flaky tests
* [ ] Test data isolation
* [ ] Deploy with feature flags
* [ ] Flag cleanup plan
* [ ] Rollback plan ready
* [ ] Correct migration order
* [ ] Clear healthcheck distinction (liveness/readiness)

### 1️⃣1️⃣ Observability
* [ ] Exceptions not swallowed
* [ ] Correct log levels
* [ ] Correlation IDs implemented
* [ ] Metrics (latency/error/saturation)
* [ ] Meaningful alerts
* [ ] No alert storms

### 1️⃣2️⃣ Infrastructure & DevOps
* [ ] Container image scanning (Trivy/Snyk)
* [ ] Non-root containers
* [ ] Read-only filesystem
* [ ] CPU / memory limits defined
* [ ] HPA/VPA not choking the cluster
* [ ] Secret rotation in place
* [ ] Config hot-reload
* [ ] Blue-green / canary deployment
* [ ] IaC drift control

### 1️⃣3️⃣ Data & Compliance
* [ ] PII masking/anonymization
* [ ] GDPR/KVKK forget-me implemented
* [ ] Automatic retention policy
* [ ] Cross-region legality verified
* [ ] Backups encrypted
* [ ] Restore tested
* [ ] RTO / RPO defined

### 1️⃣4️⃣ Cost & Optimization
* [ ] Resource tagging in place
* [ ] Unused resources cleaned
* [ ] Awareness of Cross-AZ/region costs
* [ ] Logical log retention
* [ ] Dev/test auto-shutdown

### 1️⃣5️⃣ Security (Deep)
* [ ] Dependency confusion prevention
* [ ] SAST in pipeline
* [ ] DAST in pipeline
* [ ] Git history secret cleanup
* [ ] Runtime security (Falco, etc.)
* [ ] Pod-to-pod network policy
* [ ] SBOM generated

### 1️⃣6️⃣ Chaos & Resilience
* [ ] System stays up when a pod dies
* [ ] Network latency tested
* [ ] Partial failures tolerated
* [ ] Data integrity checksums
* [ ] Graceful degradation
