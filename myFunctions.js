function validateForm() {

    // التحقق من الاسم العربي
    var fullname = document.getElementById('fullname').value.trim();
    var arabicNameRegex = /^[\u0600-\u06FF\s]+$/;

    if (fullname === "") {
        alert("الرجاء إدخال الاسم الكامل.");
        return false;
    }

    if (!arabicNameRegex.test(fullname)) {
        alert("الاسم الكامل يجب أن يحتوي على أحرف عربية فقط.");
        return false;
    }

    // التحقق من الرقم الوطني
    var nationalId = document.getElementById('nationalId').value.trim();
    var nationalIdRegex = /^(0[1-9]|1[0-4])\d{9}$/;

    if (nationalId === "") {
        alert("الرقم الوطني إلزامي.");
        return false;
    }

    if (!nationalIdRegex.test(nationalId)) {
        alert("الرقم الوطني غير صالح.");
        return false;
    }

    // التحقق من التواريخ
    var startDateStr = document.getElementById('startDate').value;
    var endDateStr = document.getElementById('endDate').value;

    if (startDateStr === "" || endDateStr === "") {
        alert("تاريخ البداية والنهاية إلزاميان.");
        return false;
    }

    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);

    if (endDate <= startDate) {
        alert("يجب أن يكون تاريخ النهاية بعد تاريخ البداية.");
        return false;
    }

    // حساب عدد الأيام
    var totalDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // التحقق من رقم الموبايل
    var mobile = document.getElementById('mobile').value.trim();
    var mobileRegex = /^09[345689]\d{7}$/;

    if (mobile !== "" && !mobileRegex.test(mobile)) {
        alert("رقم الموبايل غير صحيح.");
        return false;
    }

    // التحقق من البريد الإلكتروني
    var email = document.getElementById('email').value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && !emailRegex.test(email)) {
        alert("البريد الإلكتروني غير صالح.");
        return false;
    }

    // جمع السيارات المختارة
    var selectedCars = [];
    var totalAmount = 0;

    var checkboxes =
        document.querySelectorAll('input[name="car"]:checked');

    if (checkboxes.length === 0) {
        alert("الرجاء اختيار سيارة واحدة على الأقل.");
        return false;
    }

    checkboxes.forEach(function (cb) {

        var pricePerDay = parseFloat(
            cb.getAttribute('data-price')
        );

        var carName =
            cb.closest('tr').cells[1].innerText;

        var cost = pricePerDay * totalDays;

        totalAmount += cost;

        selectedCars.push({
            name: carName,
            cost: cost
        });

    });

    // تطبيق الخصم
    var discount = 0;

    if (totalDays > 10) {
        discount = totalAmount * 0.05;
    }

    var finalAmount = totalAmount - discount;

    // رسالة النتيجة
    var message = "";
    message += "تم إرسال الطلب بنجاح\n\n";

    message += "السيارات المختارة:\n";

    selectedCars.forEach(function (car) {
        message +=
            "- " + car.name +
            " | التكلفة: " +
            car.cost +
            " ل.س\n";
    });

     message += "\nعدد أيام التأجير: " +
        totalDays + " يوم";

    message += "\nالمبلغ قبل الخصم: " +
        totalAmount + " ل.س";

    message += "\nالخصم: " +
        discount + " ل.س";

    message += "\nالمبلغ النهائي: " +
        finalAmount + " ل.س";

    alert(message);

    return true;
}