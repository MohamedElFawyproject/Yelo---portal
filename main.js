// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Dynamic Content Logic for Department Pages
    const departmentPage = body.dataset.department; // Get department ID from body (e.g., 'financial')

    if (departmentPage) {
        const subCategoryCards = document.querySelectorAll('.card[data-sub-category]');

        subCategoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const subCategory = card.dataset.subCategory;
                const dynamicContentArea = document.getElementById('dynamicContentArea');

                // Clear previous content
                dynamicContentArea.innerHTML = '';
                dynamicContentArea.classList.remove('active');

                // Display 'Support Representative' and 'Department Admin' cards
                const agentCardsHTML = `
                    <div class="card-grid agent-cards">
                        <div class="card" data-role="support_representative">
                            <h3>ممثل الدعم</h3>
                        </div>
                        <div class="card" data-role="department_admin">
                            <h3>إداري القسم</h3>
                        </div>
                    </div>
                `;
                dynamicContentArea.innerHTML = agentCardsHTML;
                dynamicContentArea.classList.add('active'); // Show agent cards area

                const agentCards = dynamicContentArea.querySelectorAll('.card[data-role]');

                agentCards.forEach(agentCard => {
                    agentCard.addEventListener('click', () => {
                        const role = agentCard.dataset.role;
                        const contentDetailsDiv = document.createElement('div');
                        contentDetailsDiv.className = 'dynamic-content-details'; // New container for the 3 cards

                        // Check if content is already displayed
                        const currentContent = agentCard.querySelector('.dynamic-content');
                        if (currentContent) {
                            // If content is already there, remove it (toggle off)
                            currentContent.remove();
                            agentCard.classList.remove('active-role'); // Remove active state
                            return; // Exit
                        }

                        // Remove any other displayed content from other agent cards
                        agentCards.forEach(otherCard => {
                            if (otherCard !== agentCard) {
                                const otherContent = otherCard.querySelector('.dynamic-content');
                                if (otherContent) {
                                    otherContent.remove();
                                    otherCard.classList.remove('active-role');
                                }
                            }
                        });


                        // Get content from data.js
                        const data = appData[departmentPage]?.[subCategory]?.[role];

                        if (data) {
                            contentDetailsDiv.innerHTML = `
                                <div class="dynamic-content active">
                                    <div class="dynamic-card">
                                        <h4>بداية الطلب</h4>
                                        <p>${data.start_request || 'لا يوجد شرح متاح.'}</p>
                                    </div>
                                    <div class="dynamic-card">
                                        <h4>متابعة الطلب</h4>
                                        <p>${data.follow_up || 'لا يوجد شرح متاح.'}</p>
                                    </div>
                                    <div class="dynamic-card">
                                        <h4>الإغلاق</h4>
                                        <p>${data.close_request || 'لا يوجد شرح متاح.'}</p>
                                    </div>
                                </div>
                            `;
                            agentCard.appendChild(contentDetailsDiv);
                            agentCard.classList.add('active-role'); // Add active state
                        } else {
                            console.warn(`Data not found for ${departmentPage}, ${subCategory}, ${role}`);
                            // Optionally display a message to the user
                            contentDetailsDiv.innerHTML = `
                                <div class="dynamic-content active">
                                    <p>لا توجد بيانات متاحة لهذا التصنيف حاليًا.</p>
                                </div>
                            `;
                            agentCard.appendChild(contentDetailsDiv);
                            agentCard.classList.add('active-role');
                        }
                    });
                });
            });
        });
    }
});