'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // select
    function select({
        selectHeaderSelector, 
        selectItemSelector, 
        selectCurrentSelector, 
        firstTab, 
        secondTab, 
        selectActive, 
        selectCurrentActive, 
        selectSelector, 
        firstTabActive, 
        secondTabActive
        }) {
        const selectHeader = document.querySelector(selectHeaderSelector);
        const selectItem = document.querySelectorAll(selectItemSelector);
        const selectCurrent = document.querySelector(selectCurrentSelector);
        const ulTab = document.querySelector(firstTab);
        const dmTab = document.querySelector(secondTab)

        function selectToggle() {
            this.parentElement.classList.toggle(selectActive);
            selectCurrent.classList.toggle(selectCurrentActive);
        }

        selectHeader.addEventListener('click', selectToggle);

        function selectChoose() {
            const text = this.textContent;
            const select = this.closest(selectSelector);
            const currentText = this.closest(selectSelector).querySelector(selectCurrentSelector);

            currentText.textContent = text;
            select.classList.remove(selectActive);
            selectCurrent.classList.remove(selectCurrentActive);

            if (selectCurrent.textContent === 'Ульяновск') {
                ulTab.classList.add(firstTabActive);
                dmTab.classList.remove(secondTabActive);
            }

            if (selectCurrent.textContent === 'Димитровград') {
                ulTab.classList.remove(firstTabActive);
                dmTab.classList.add(secondTabActive);
            }
        }

        selectItem.forEach(function(item) {
            item.addEventListener('click', selectChoose);
        });
    }

    select({
        selectHeaderSelector: '.service__select-header', 
        selectItemSelector: '.service__select-item', 
        selectCurrentSelector: '.service__select-current', 
        firstTab: '.service__centres', 
        secondTab: '.service__dm', 
        selectActive: 'service__select_active', 
        selectCurrentActive: 'service__select-current_active',
        selectSelector: '.service__select',
        firstTabActive: 'service__centres_active',
        secondTabActive: 'service__dm_active'
    });

    select({
        selectHeaderSelector: '.shops__select-header', 
        selectItemSelector: '.shops__select-item', 
        selectCurrentSelector: '.shops__select-current', 
        firstTab: '.shops__list', 
        secondTab: '.shops__dm', 
        selectActive: 'shops__select_active', 
        selectCurrentActive: 'shops__select-current_active',
        selectSelector: '.shops__select',
        firstTabActive: 'shops__list_active',
        secondTabActive: 'shops__dm_active'
    });

    // tabs
    function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        const tabs = document.querySelectorAll(tabsSelector);
        const tabsContent = document.querySelectorAll(tabsContentSelector);
        const tabsParent = document.querySelector(tabsParentSelector); 
    
        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });
    
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        hideTabContent();
    
        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activeClass);
        }

        showTabContent();
    
        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.closest(tabsSelector)) {
                tabs.forEach((item, i) => {
                    if (target == item || target.closest(tabsSelector) == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }

    tabs('.tabheader__item', '.tabcontent__item', '.tabheader__list', 'tabheader__item_active');

    // input range
    const range = document.querySelector('.range');
    const heatArea = document.querySelector('.heat__area-value');
    const heatModel = document.querySelector('.heat__model-value');

    heatArea.textContent = range.value;

    range.addEventListener('input', function() {
        heatArea.textContent = this.value;

        if (heatArea.textContent < 100) {
            heatModel.textContent = 10;
        } else if (heatArea.textContent >= 100 && heatArea.textContent < 150) {
            heatModel.textContent = 15;
        } else if (heatArea.textContent >= 150 && heatArea.textContent < 200) {
            heatModel.textContent = 20;
        } else if (heatArea.textContent >= 200 && heatArea.textContent < 250) {
            heatModel.textContent = 25;
        } else if (heatArea.textContent >= 250 && heatArea.textContent < 300) {
            heatModel.textContent = 30;
        } else if (heatArea.textContent >= 300 && heatArea.textContent < 350) {
            heatModel.textContent = 35;
        } else if (heatArea.textContent >= 350 && heatArea.textContent < 400) {
            heatModel.textContent = 40;
        } else if (heatArea.textContent >= 400 && heatArea.textContent < 500) {
            heatModel.textContent = 50;
        } else if (heatArea.textContent >= 500 && heatArea.textContent < 600) {
            heatModel.textContent = 60;
        } else if (heatArea.textContent >= 600 && heatArea.textContent < 990) {
            heatModel.textContent = 100;
        }
    });

    // filter
    const filterCheckbox = document.querySelectorAll('.filter__checkbox-real');
    const filterCheckboxAll = document.querySelector('.filter__checkbox-real_all');
    const subFilterCheckbox = document.querySelectorAll('.subfilter__checkbox-real');

    function checkAll() {
        filterCheckboxAll.addEventListener('input', () => {
            if (filterCheckboxAll.checked) { 
                filterCheckbox.forEach(filterCheckbox => {
                    if (filterCheckbox.checked === false) {
                        filterCheckbox.checked = true;
                    }
                });
    
                subFilterCheckbox.forEach(subFilterCheckbox => {
                    if (subFilterCheckbox.checked === false) {
                        subFilterCheckbox.checked = true;
                    }
                });
            } else if (filterCheckboxAll.checked === false) {
                filterCheckbox.forEach(filterCheckbox => {
                    if (filterCheckbox.checked === true) {
                        filterCheckbox.checked = false;
                    }
                });
    
                subFilterCheckbox.forEach(subFilterCheckbox => {
                    if (subFilterCheckbox.checked === true) {
                        subFilterCheckbox.checked = false;
                    }
                });
            }
        });

    }

    checkAll();

    function uncheckAll() {
        filterCheckbox.forEach(filterCheckbox => {
            filterCheckbox.addEventListener('input', () => {
                if (filterCheckbox.checked === false) {
                    filterCheckboxAll.checked = false;
                }
            });
        });

        subFilterCheckbox.forEach(subFilterCheckbox => {
            subFilterCheckbox.addEventListener('input', () => {
                if (subFilterCheckbox.checked === false) {
                    filterCheckboxAll.checked = false;
                }
            });
        });
    }

    uncheckAll();

    // slider
    function slider({
        slide, 
        prevArrow, 
        nextArrow, 
        startArrow, 
        endArrow, 
        sliderPageSelector}) {
		const slides = document.querySelectorAll(slide);
		const sliderArrowPrev = document.querySelector(prevArrow);
        const sliderArrowNext = document.querySelector(nextArrow);
        const sliderArrowStart = document.querySelector(startArrow);
        const sliderArrowEnd = document.querySelector(endArrow);
        const sliderPage = document.querySelectorAll(sliderPageSelector);
		
        let slideIndex = 1;
        
		function showSlides(n) {
			if (n > slides.length) {
				slideIndex = 1; 
			}

			if (n < 1) {
				slideIndex = slides.length; 
			}

			slides.forEach(slide => {
				slide.style.display = 'none';
			});

			slides[slideIndex - 1].style.display = 'block';
		}

		showSlides(slideIndex);

        function unhighlightSliderPage() {
            sliderPage.forEach(item => {
                item.style.backgroundColor = '#ffffff';
            });
        }

        function highlightSliderPage(item) {
            item.style.backgroundColor = 'rgba(0, 123, 197, 0.4)';
        }

        function changeHighlightSliderPage() {
            sliderPage.forEach((item, i) => {
                if (slideIndex - 1 === i) {
                    unhighlightSliderPage();
                    highlightSliderPage(item);
                }
            });
        }

        sliderArrowPrev.addEventListener('click', () => {
            slideIndex--;
            showSlides(slideIndex);
            changeHighlightSliderPage();
		});

		sliderArrowNext.addEventListener('click', () => {
            slideIndex++;
            showSlides(slideIndex);
            changeHighlightSliderPage();
        });

        sliderArrowStart.addEventListener('click', () => {
            slideIndex = 1;
            showSlides(slideIndex);
            changeHighlightSliderPage();
        });

        sliderArrowEnd.addEventListener('click', () => {
            slideIndex = slides.length;
            showSlides(slideIndex);
            changeHighlightSliderPage();
        });

        sliderPage.forEach(item => {
            item.addEventListener('click', () => {
                slideIndex = item.textContent;
                showSlides(slideIndex);
                unhighlightSliderPage();
                highlightSliderPage(item);
            });
        });
	}

	slider({
		slide: '.slider__item', 
		prevArrow: '.slider__arrow-left',
        nextArrow: '.slider__arrow-right',
        startArrow: '.slider__doublearrow-left',
        endArrow: '.slider__doublearrow-right',
        sliderPageSelector: '.slider__page'
    });
    
    // hamburger
    const menu = document.querySelector('.header__list');
    const menuItem = document.querySelectorAll('.header__item');
    const hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', () => {
        console.log('click');
        hamburger.classList.toggle('header__hamburger_active');
        menu.classList.toggle('header__list_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('header__hamburger_active');
            menu.classList.toggle('header__list_active');
        })
    });
});