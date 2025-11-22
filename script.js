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
        <div style="background: white; color: black; padding: 20px; max-width: 100%; margin: 0 auto;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
                <h1 style="font-size: 1.8rem; font-weight: bold; margin-bottom: 10px;">কিশোরকন্ঠ ফাউন্ডেশন</h1>
                <h2 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 8px;">কিশোরকন্ঠ মেধাবৃত্তি পরীক্ষা ২০২৫</h2>
                <p style="font-size: 1.1rem;">📍 রাজশাহী জেলা পশ্চিম</p>
            </div>
            
            <!-- Congratulations -->
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%); color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
                <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 8px;">অভিনন্দন!</h2>
                <p style="font-size: 1.1rem;">আপনি কিশোরকন্ঠ মেধাবৃত্তি পরীক্ষায় অংশগ্রহণ করেছেন</p>
            </div>
            
            <!-- Student Information - Single Column -->
            <div style="background-color: rgb(254 242 242); border-radius: 12px; padding: 20px; border: 2px solid rgb(220 38 38); margin-bottom: 20px; text-align: center; width: 100%;">
                <h3 style="color: rgb(220 38 38); font-size: 1.3rem; margin-bottom: 15px; font-weight: 600;">ছাত্র/ছাত্রীর তথ্য</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <span style="font-weight: 600; text-align: left; width: 45%;">নাম:</span>
                        <span style="text-align: left; width: 55%;">${studentName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <span style="font-weight: 600; text-align: left; width: 45%;">পিতার নাম:</span>
                        <span style="text-align: left; width: 55%;">${fatherName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <span style="font-weight: 600; text-align: left; width: 45%;">রেজিস্ট্রেশন নং:</span>
                        <span style="text-align: left; width: 55%;">${regNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <span style="font-weight: 600; text-align: left; width: 45%;">শ্রেণি:</span>
                        <span style="text-align: left; width: 55%;">${studentClass}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0;">
                        <span style="font-weight: 600; text-align: left; width: 45%;">মোবাইল নং:</span>
                        <span style="text-align: left; width: 55%;">${studentMobile}</span>
                    </div>
                </div>
            </div>
            
            <!-- Institutional Information - Single Column -->
            <div style="background-color: rgb(239 246 255); border-radius: 12px; padding: 20px; border: 2px solid #6d28d9; margin-bottom: 20px; text-align: center; width: 100%;">
                <h3 style="color: rgb(30 64 175); font-size: 1.3rem; margin-bottom: 15px; font-weight: 600;">প্রাতিষ্ঠানিক তথ্য</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <span style="font-weight: 600; text-align: left; width: 45%;">বিদ্যালয়:</span>
                        <span style="text-align: left; width: 55%;">${schoolName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0;">
                        <span style="font-weight: 600; text-align: left; width: 45%;">পরীক্ষা কেন্দ্র:</span>
                        <span style="text-align: left; width: 55%;">${examCenter}</span>
                    </div>
                </div>
            </div>
            
            <!-- Marks -->
            <div style="background-color: #F0FDF4; border-radius: 12px; padding: 25px; border: 2px solid #10B981; width: 100%; text-align: center; margin-bottom: 20px;">
                <h3 style="color: rgb(45, 172, 91); font-size: 1.3rem; margin-bottom: 15px; font-weight: 600;">প্রাপ্ত নম্বর</h3>
                <p style="color: rgb(22 128 61); font-size: 3rem; font-weight: bold; margin: 0;">${obtainedMarks}</p>
            </div>
            
            <!-- Footer - Only one footer in download image -->
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #ccc;">
                <p style="font-size: 11px; color: #666; margin-bottom: 5px;">এই সার্টিফিকেটটি কম্পিউটার দ্বারা জেনারেটেড হয়েছে</p>
                <p style="font-size: 11px; color: #666; margin-bottom: 10px;">© ২০২৫ কিশোরকন্ঠ ফাউন্ডেশন - রাজশাহী জেলা পশ্চিম</p>
                <div style="font-size: 11px; font-weight: bold; color: #1e40af; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 8px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    এই সিস্টেমটি ডেভেলপ করেছেন আইটি বিভাগ - গোদাগাড়ী পশ্চিম সাংগঠনিক থানা শাখা
                </div>
            </div>
        </div>
    `;
    
    captureContent.innerHTML = contentHTML;
    
    
    const captureFooter = captureContainer.querySelector('.print-capture-footer');
    let originalFooterDisplay = '';
    if (captureFooter) {
        originalFooterDisplay = captureFooter.style.display;
        captureFooter.style.display = 'none';
    }
    
    captureContainer.style.display = 'block';
    
   
    setTimeout(() => {
        html2canvas(captureContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: captureContainer.scrollWidth,
            height: captureContainer.scrollHeight,
            windowWidth: captureContainer.scrollWidth,
            windowHeight: captureContainer.scrollHeight
        }).then((canvas) => {
            captureContainer.style.display = 'none';
            
            
            if (captureFooter) {
                captureFooter.style.display = originalFooterDisplay;
            }
            
            const imageUrl = canvas.toDataURL('image/jpeg', 0.95);
            const downloadLink = document.createElement('a');
            downloadLink.href = imageUrl;
            downloadLink.download = 'kishore-kantha-result.jpg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            previewContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'max-w-full h-auto border rounded-lg';
            previewContainer.appendChild(img);
        }).catch(error => {
            console.error('Error generating download image:', error);
            previewContainer.innerHTML = '<p class="text-red-500">ডাউনলোড তৈরি করতে সমস্যা হয়েছে। সরাসরি প্রিন্ট বাটন ব্যবহার করুন।</p>';
            captureContainer.style.display = 'none';
            
            
            if (captureFooter) {
                captureFooter.style.display = originalFooterDisplay;
            }
        });
    }, 100);
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
        
        const congratsContainer = document.querySelector('.congratulations-container');
        const originalDisplay = congratsContainer.style.display;
        congratsContainer.style.display = 'none';
        
       
        document.querySelector('.print-header').style.display = 'block';
        document.querySelector('.print-footer').style.display = 'block';
        
        setTimeout(() => {
            window.print();
            
            
            setTimeout(() => {
                congratsContainer.style.display = originalDisplay;
                document.querySelector('.print-header').style.display = 'none';
                document.querySelector('.print-footer').style.display = 'none';
            }, 100);
        }, 100);
    });

    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    });
});
