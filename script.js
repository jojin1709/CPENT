        // Create background particles
        const bgAnimation = document.getElementById('bgAnimation');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
            bgAnimation.appendChild(particle);
        }

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Module expand/collapse
        function toggleExpand(btn) {
            const card = btn.closest('.module-card');
            card.classList.toggle('expanded');
            btn.textContent = card.classList.contains('expanded') ? 'Hide Details ' : 'View Details ';
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down';
            btn.appendChild(icon);
        }

        // Module completion tracking
        const totalModules = 13;
        let completedModules = JSON.parse(localStorage.getItem('cpent-modules') || '[]');

        function updateProgress() {
            const count = completedModules.length;
            document.getElementById('progressText').textContent = `${count} / ${totalModules} completed`;
            document.getElementById('progressBar').style.width = (count / totalModules * 100) + '%';
        }

        function toggleModule(el, event) {
            event.stopPropagation();
            const card = el.closest('.module-card');
            const moduleId = card.dataset.module;

            if (completedModules.includes(moduleId)) {
                completedModules = completedModules.filter(id => id !== moduleId);
                el.classList.remove('checked');
            } else {
                completedModules.push(moduleId);
                el.classList.add('checked');
            }

            localStorage.setItem('cpent-modules', JSON.stringify(completedModules));
            updateProgress();
        }

        // Restore checked state
        document.querySelectorAll('.module-card').forEach(card => {
            if (completedModules.includes(card.dataset.module)) {
                card.querySelector('.module-check').classList.add('checked');
            }
        });
        updateProgress();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Counter animation for stats
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const num = parseInt(text);
                    if (!isNaN(num)) {
                        let current = 0;
                        const increment = num / 30;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= num) {
                                el.textContent = text;
                                clearInterval(timer);
                            } else {
                                el.textContent = Math.floor(current) + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                            }
                        }, 30);
                    }
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));

        // FAQ Toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const wasActive = item.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Toggle the clicked one
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });
