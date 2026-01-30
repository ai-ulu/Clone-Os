## Description / Açıklama
<!-- Describe your changes / Değişikliklerinizi açıklayın -->

## Enterprise Checklist / Kurumsal Kontrol Listesi

### 🧠 Golden Rule / Altın Kural
- [ ] 1000 users concurrent? / 1000 eşzamanlı kullanıcı?
- [ ] Idempotent? / Tekrarlanabilir (İşlem iki kez çalışırsa)?
- [ ] Partial failure handled? / Yarıda kalma durumu?

### 🚀 Performance & Scalability / Performans ve Ölçeklenebilirlik
- [ ] No N+1 / N+1 sorgu yok
- [ ] Payload minimal
- [ ] No O(n²) in loops / Döngülerde O(n²) yok

### 🔒 Security / Güvenlik
- [ ] AuthN & AuthZ checked / Kimlik doğrulama ve Yetkilendirme kontrol edildi
- [ ] No PII in logs / Loglarda kişisel veri yok
- [ ] Input validation (Server-side) / Girdi doğrulaması

### ⚛️ Frontend (If applicable) / Ön Yüz (Eğer geçerliyse)
- [ ] Double submit prevented / Çift tıklama engelli
- [ ] Loading & Error states / Yükleme ve Hata durumları
- [ ] Accessibility check / Erişilebilirlik kontrolü

### 🧪 Testing & Reliability / Test ve Güvenilirlik
- [ ] Unit/Integration tests added / Testler eklendi
- [ ] Rollback plan ready / Geri dönüş planı hazır
- [ ] Metrics & Alerts defined / Metrik ve Alarmlar tanımlı

## Screenshots / Ekran Görüntüleri (Optional)
<!-- Add if relevant -->
