function showAlert(message, type = 'error') {
    const alertContainer = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
    alertDiv.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white font-bold">&times;</button>
        </div>
    `;
    alertContainer.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

function createConfetti() {
    const container = document.querySelector('.congratulations-container');
    const colors = ['#f59e0b', '#eab308', '#fbbf24', '#f97316', '#ef4444', '#3b82f6', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(confetti);
    }
}

function showError(message) {
    document.getElementById('error-text').textContent = message;
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
}

function displayResult(student) {
    document.getElementById('student-name').textContent = student.name;
    document.getElementById('father-name').textContent = student.fatherName;
    document.getElementById('reg-number').textContent = student.registration;
    document.getElementById('student-class').textContent = `${getBengaliClass(student.class)} শ্রেণি`;
    document.getElementById('school-name').textContent = student.school;
    document.getElementById('exam-center').textContent = student.examCenter;
    document.getElementById('student-mobile').textContent = student.mobile;
    document.getElementById('obtained-marks').textContent = `${toBengaliNumber(student.marks)} / ${toBengaliNumber(100)}`;
    
    document.getElementById('results-section').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    createConfetti();
    
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function generateResultImage() {
    const modal = document.getElementById('print-modal');
    const previewContainer = document.getElementById('preview-container');
    
    modal.style.display = 'block';
    previewContainer.innerHTML = '<p>প্রিভিউ তৈরি হচ্ছে...</p>';
    
    const printableSection = document.getElementById('printable-section');
    
    html2canvas(printableSection, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: null
    }).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
        previewContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'max-w-full h-auto border rounded-lg';
        previewContainer.appendChild(img);
    }).catch(error => {
        console.error('Error generating preview:', error);
        previewContainer.innerHTML = '<p class="text-red-500">প্রিভিউ তৈরি করা সম্ভব হয়নি। সরাসরি প্রিন্ট বাটন ব্যবহার করুন।</p>';
    });
}

function generateDownloadImage() {
    const previewContainer = document.getElementById('preview-container');
    const captureContainer = document.getElementById('print-capture-container');
    const captureContent = document.getElementById('capture-content');
    
    previewContainer.innerHTML = '<p>ডাউনলোড তৈরি হচ্ছে...</p>';
    
    const studentName = document.getElementById('student-name').textContent;
    const fatherName = document.getElementById('father-name').textContent;
    const regNumber = document.getElementById('reg-number').textContent;
    const studentClass = document.getElementById('student-class').textContent;
    const studentMobile = document.getElementById('student-mobile').textContent;
    const schoolName = document.getElementById('school-name').textContent;
    const examCenter = document.getElementById('exam-center').textContent;
    const obtainedMarks = document.getElementById('obtained-marks').textContent;
    
    const contentHTML = `
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #f59e0b 100%); color: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);">
            <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 8px;">অভিনন্দন!</h2>
            <p style="font-size: 1.125rem; margin-bottom: 4px;">আপনি কিশোরকন্ঠ মেধাবৃত্তি পরীক্ষায় অংশগ্রহণ করেছেন</p>
            <p style="font-size: 1.125rem;">আপনার ফলাফল নিচে দেখানো হলো</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="background-color: rgb(254 242 242); border-radius: 12px; padding: 20px; border: 1px solid rgb(220 38 38); border-left: 4px solid rgb(220 38 38);">
                <h3 style="color: rgb(220 38 38); font-size: 1.2rem; margin-bottom: 16px; text-align: center; font-weight: 600;">ছাত্র/ছাত্রীর তথ্য</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.1); gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 40%; text-align: left;">নাম:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${studentName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.1); gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 40%; text-align: left;">পিতার নাম:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${fatherName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.1); gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 40%; text-align: left;">রেজিস্ট্রেশন নাম্বার:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${regNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.1); gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 40%; text-align: left;">শ্রেণি:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${studentClass}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 40%; text-align: left;">মোবাইল নাম্বার:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${studentMobile}</span>
                    </div>
                </div>
            </div>
            
            <div style="background-color: rgb(239 246 255); border-radius: 12px; padding: 20px; border: 1px solid #6d28d9; border-left: 4px solid #6d28d9;">
                <h3 style="color: rgb(30 64 175); font-size: 1.2rem; margin-bottom: 16px; text-align: center; font-weight: 600;">প্রাতিষ্ঠানিক তথ্য</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.1); gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 20%; text-align: left;">বিদ্যালয়:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${schoolName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                        <span style="font-weight: 600; flex: 0 0 20%; text-align: left;">পরীক্ষা কেন্দ্র:</span>
                        <span style="flex: 1; text-align: left; line-height: 1.5;">${examCenter}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <div style="background-color: #F0FDF4; border-radius: 12px; padding: 20px; border: 1px solid #10B981; border-left: 4px solid #10B981; width: 100%;">
                <h3 style="color: rgb(45, 172, 91); text-align: center; font-size: 1.2rem; margin-bottom: 16px; font-weight: 600;">প্রাপ্ত নম্বর</h3>
                <p style="color: rgb(22 128 61); font-size: 2.5rem; font-weight: bold; margin: 0; text-align: center;">${obtainedMarks}</p>
            </div>
        </div>
    `;
    
    captureContent.innerHTML = contentHTML;
    
    captureContainer.style.display = 'block';
    
    html2canvas(captureContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
    }).then((canvas) => {
        captureContainer.style.display = 'none';
        
        const imageUrl = canvas.toDataURL('image/jpeg', 0.95);
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = 'kishore-kantha-result.jpg';
        downloadLink.click();
        
        previewContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'max-w-full h-auto border rounded-lg';
        previewContainer.appendChild(img);
    }).catch(error => {
        console.error('Error generating download image:', error);
        previewContainer.innerHTML = '<p class="text-red-500">ডাউনলোড তৈরি করতে সমস্যা হয়েছে। সরাসরি প্রিন্ট বাটন ব্যবহার করুন।</p>';
        captureContainer.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registration').addEventListener('input', function(e) {
        const value = e.target.value;
        if (!validateNumbersOnly(value) && value.length > 0) {
            this.classList.add('error');
            showAlert('দয়া করে শুধুমাত্র সংখ্যা লিখুন', 'error');
        } else {
            this.classList.remove('error');
        }
    });

    document.getElementById('mobile').addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        this.value = value;
        
        if (value.length === 11 && !validateMobile(value)) {
            this.classList.add('error');
            showAlert('দয়া করে সঠিক মোবাইল নাম্বার লিখুন (01XXXXXXXXX)', 'error');
        } else {
            this.classList.remove('error');
        }
    });

    document.getElementById('search-btn').addEventListener('click', function() {
        const registration = document.getElementById('registration').value.trim();
        const studentClass = document.getElementById('class').value;
        const mobile = document.getElementById('mobile').value.trim();
        
        if (!registration || !studentClass || !mobile) {
            showError('দয়া করে রেজিস্ট্রেশন নাম্বার, শ্রেণি এবং মোবাইল নাম্বার প্রদান করুন।');
            return;
        }
        
        if (!validateNumbersOnly(registration)) {
            showError('দয়া করে শুধুমাত্র সংখ্যা লিখুন।');
            return;
        }
        
        if (!validateMobile(mobile)) {
            showError('দয়া করে সঠিক মোবাইল নাম্বার লিখুন (01XXXXXXXXX)।');
            return;
        }
        
        const student = studentData.find(s => 
            s.registration === registration && 
            s.class === studentClass && 
            s.mobile === mobile
        );
        
        if (student) {
            displayResult(student);
        } else {
            showError('দুঃখিত, প্রদত্ত তথ্যের সাথে মিলে এমন কোন ফলাফল পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।');
        }
    });

    document.getElementById('print-btn').addEventListener('click', function() {
        generateResultImage();
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('print-modal').style.display = 'none';
    });

    document.getElementById('download-btn').addEventListener('click', function() {
        generateDownloadImage();
    });

    document.getElementById('print-direct-btn').addEventListener('click', function() {
        document.getElementById('results-section').classList.remove('hidden');
        
        setTimeout(() => {
            window.print();
        }, 100);
    });

    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    });
});
