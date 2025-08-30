// モバイルメニューのトグル
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // モバイルメニューのリンクをクリックしたら閉じる
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // ナビゲーションバーの設定
    const navbar = document.getElementById('navbar');
    
    // 常に白背景に設定
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

    // Intersection Observerを使用したフェードインアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // フェードイン要素を監視
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // スムーススクロール（ナビゲーションリンク用）
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // アクティブリンクのハイライト
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    function highlightActiveLink() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('text-pink-500');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-pink-500');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);


    // パフォーマンス数値のカウントアップアニメーション
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current + (element.textContent.includes('%') ? '%' : '+');
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // 数値アニメーションの実行
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const endValue = parseInt(entry.target.textContent);
                animateValue(entry.target, 0, endValue, 1500);
            }
        });
    }, observerOptions);

    const stats = document.querySelectorAll('.text-3xl.font-bold.text-purple-600');
    stats.forEach(stat => {
        if (stat.textContent !== '24/7') {
            statsObserver.observe(stat);
        }
    });

    // ローディングアニメーション（ページ読み込み時）
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });



    // サービスカードのホバーエフェクト強化
    const serviceCards = document.querySelectorAll('.card-hover');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
