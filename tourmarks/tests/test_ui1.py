import os
import unittest

from selenium import webdriver

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "test_proj1.settings")
from django.conf import settings
import django
django.setup()

from unittest import TestCase

from selenium.webdriver.common.by import By

from tourmarks.models import User
# from support import page_element_c


# locators
class fixtures_c:
    class common_loc:
        home_link = (By.LINK_TEXT, 'Home')
        login_link = (By.LINK_TEXT, 'Login')
        logout_link = (By.LINK_TEXT, 'Logout')
        register_link = (By.LINK_TEXT, 'Register')
        profile_link = (By.LINK_TEXT, 'Profile')
        visits_link = (By.LINK_TEXT, 'Visits')
        locations_link = (By.LINK_TEXT, 'Locations')
        users_link = (By.LINK_TEXT, 'Users')

        register_loc = (By.ID, 'register_header')
        users_loc = (By.ID, 'users_header')
        visits_loc = (By.ID, 'visits_header')
        locations_loc = (By.ID, 'locations_header')
        locationratio_loc = (By.ID, 'locationratio_header')
        userratio_loc = (By.ID, 'userratio_header')
        login_loc = (By.ID, 'login_header')
        profile_loc = (By.ID, 'profile_header')
        home_loc = (By.ID, 'home_header')

    class login_loc:
        username = (By.ID, 'username')
        password = (By.ID, 'password')
        login_button = (By.ID, 'submit')

    class users:
        users = []

        def __init__(self) -> None:
            self.generate_users()

        def generate_users(self):
            current_users = User.objects.all()
            suffix = str(current_users.count())
            self.users.append({'username': 'user10' + suffix, 'password': 'pass10' + suffix})


class page_base_c:

    def __init__(self, driver, base_url='http://localhost:4200/') -> None:
        self.driver = driver
        self.base_url = base_url or getattr(self.driver, 'base_url', None)
        self.timeout = 30

    def find_element(self, *locator):
        return self.driver.find_element(*locator)

    def open(self, url):
        url = self.base_url + url
        self.driver.get(url)


class common_page_c(page_base_c):

    def __init__(self, driver, base_url='http://localhost:4200/', present_loc=None) -> None:
        super().__init__(driver, base_url)
        self.present_loc = present_loc or (By.CSS_SELECTOR, '.nav-link.active')

    def click_locations(self):
        self.find_element(*fixtures_c.common_loc.home_link).click()
        return locations_page_c(self.driver)

    def click_visits(self):
        self.find_element(*fixtures_c.common_loc.home_link).click()
        return visits_page_c(self.driver)

    def click_users(self):
        self.find_element(*fixtures_c.common_loc.home_link).click()
        return users_page_c(self.driver)

    def click_login(self):
        self.find_element(*self.home_link).click()
        return login_page_c(self.driver)

    def click_register(self):
        self.find_element(*self.home_link).click()
        return register_page_c(self.driver)

    def check_page_loaded(self):
        return True if self.find_element(*self.present_loc) else False


class locations_page_c(common_page_c):
    pass


class visits_page_c(common_page_c):
    pass


class users_page_c(common_page_c):
    pass


class home_page_c(common_page_c):
    pass


class login_page_c(common_page_c):
    def enter_username(self, user):
        self.find_element(*fixtures_c.login_loc.username).send_keys(user['username'])

    def enter_password(self, user):
        self.find_element(*fixtures_c.login_loc.password).send_keys(user['password'])

    def click_login(self):
        self.find_element(*fixtures_c.login_loc.login_button).click()

    def login(self, user):
        self.enter_username(user)
        self.enter_password(user)
        self.click_login()

    def login_with_valid_user(self, user):
        self.login(user)
        return home_page_c(self.driver)

    # def login_with_in_valid_user(self, user):
    #     self.login(user)
    #     return self.find_element(*common_page_c.common.erERROR_MESSAGE).text


class register_page_c(common_page_c):

    def __init__(self, driver, base_url='http://localhost:4200/', present_loc=None) -> None:
        super().__init__(driver, base_url, present_loc)
        self.present_loc = (fixtures_c.common_loc.register_loc)

@unittest.skip
class test_ui1(TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome

    def test_page_load(self):
        page = home_page_c(self.driver)
        self.assertTrue(page.check_page_loaded())

    def test_sign_up_button(self):
        page = home_page_c(self.driver)
        sign_up_page = page.click_register()
        sign_up_page.check_page_loaded()
        # self.assertIn("ap/register", signUpPage.get_url())

    def test_sign_in_with_valid_user(self):
        locations_page = locations_page_c(self.driver)
        login_page = locations_page.click_login()
        result_page = login_page.login_with_valid_user(fixtures_c.users.users[-1])
        self.assertEquals(result_page.present_loc, fixtures_c.common_loc.locations_loc)

    def tearDown(self):
        self.driver.close()
        super().tearDown()


if __name__ == "__main__":
    suite = unittest.TestLoader().loadTestsFromTestCase(test_ui1)
    unittest.TextTestRunner(verbosity=2).run(suite)
