import unittest

from django.test import LiveServerTestCase
from selenium.webdriver.chrome import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
import time

class login_test_case_c(LiveServerTestCase):
    def setUp(self):
        self.selenium = webdriver.WebDriver(r'E:\app\devel\web\selenium\chromedriver.exe')
        super().setUp()

    def tearDown(self):
        self.selenium.quit()
        super().tearDown()
    @unittest.skip
    def test_register_login_status(self):
        se = self.selenium
        se.get('http://localhost:4200/register')
        username = se.find_element_by_id('username')
        password = se.find_element_by_id('password')
        submit = se.find_element_by_id('submit')
        username.send_keys('user8')
        password.send_keys('pass8')
        # WebDriverWait(se, 1).until(lambda se: False)
        time.sleep(3)
        submit.click()
        # print (se.page_source)
        WebDriverWait(se,10).until(lambda se: 'Logged In?' in se.page_source)
        time.sleep(3)
        assert 'Logged In? true' in se.page_source

    def test_login(self):
        se = self.selenium
        se.get('http://localhost:4200/login')
        username = se.find_element_by_id('username')
        password = se.find_element_by_id('password')
        submit = se.find_element_by_id('submit')
        username.send_keys('user22')
        password.send_keys('pass22')
        # WebDriverWait(se, 1).until(lambda se: False)
        time.sleep(3)
        submit.click()
        # print (se.page_source)
        WebDriverWait(se, 10).until(lambda se: 'Logout' in se.page_source)
        time.sleep(3)


    def test_ratio(self):
        se = self.selenium
        se.get('http://localhost:4200/login')
        username = se.find_element_by_id('username')
        password = se.find_element_by_id('password')
        submit = se.find_element_by_id('submit')
        username.send_keys('user22')
        password.send_keys('pass22')
        # WebDriverWait(se, 1).until(lambda se: False)
        time.sleep(3)
        submit.click()

        # print (se.page_source)
        WebDriverWait(se, 10).until(lambda se: 'Logout' in se.page_source)
        locations = se.find_element_by_partial_link_text('Locations')
        locations.click()
        WebDriverWait(se, 10).until(lambda se: 'Current locations' in se.page_source)
        time.sleep(1)
        rating = se.find_elements_by_xpath('//a[contains(@ng-reflect-router-link,",1")]')
        rating[0].click()
        WebDriverWait(se, 10).until(lambda se: 'Location rating for: main square' in se.page_source)


