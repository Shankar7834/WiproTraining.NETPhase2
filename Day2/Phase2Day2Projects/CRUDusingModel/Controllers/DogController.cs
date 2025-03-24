using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRUDusingModel.Models;
namespace CRUDusingModel.Controllers
{
    public class DogController : Controller
    {

        static private List<Dog> dogs = new List<Dog>();
        // GET: DogController
        public ActionResult Index()
        {
            return View(dogs);
        }

        // GET: DogController/Details/5
        public ActionResult Details(int id)
        {
            Dog d = new Dog();
            foreach(Dog dog in dogs)
            {
                if(dog.ID==id)
                {
                    d.ID = dog.ID;
                    d.Name = dog.Name;
                    d.Age = dog.Age;
                }
            }
            return View(d);
        }

        // GET: DogController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DogController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Dog dog)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    dogs.Add(dog);
                    return  RedirectToAction("index");
                }
                else
                {
                    return View("Create",dog);
                }
            }
            catch (Exception)
            {

                return View("Create", dog);
            }
        }

        // GET: DogController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: DogController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Dog d)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View("Edit", d);

                }
                else
                {
                    foreach (Dog dog in dogs)
                    {
                        if (dog.ID == d.ID)
                        {
                            dog.Name = d.Name;
                            dog.Age = d.Age;
                        }
                    }
                    return RedirectToAction("Index");
                }

            }
            catch (Exception)
            {

                return View("Edit", d);
            }
        }

        // GET: DogController/Delete/5
        //public ActionResult Delete(int id)
        //{

        //    Dog d = new Dog();
        //    foreach (Dog dog in dogs)
        //    {
        //        if (dog.ID == id)
        //        {
        //            d.ID = dog.ID;
        //            d.Name = dog.Name;
        //            d.Age = dog.Age;
        //        }
        //    }
        //    return View(d);
        //}

        //// POST: DogController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(Dog d)
        //{
        //    try
        //    {
        //        foreach (Dog dog in dogs)
        //        {
        //            if (dog.ID == d.ID)
        //            {
        //                dogs.Remove(dog);
        //                break;
        //            }
        //        }
        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception)
        //    {

        //        return View();
        //    }
        //}

        // GET: DogController/Delete/5
        public ActionResult Delete(int id)
        {
            var dogToDelete = dogs.FirstOrDefault(d => d.ID == id);
            if (dogToDelete != null)
            {
                dogs.Remove(dogToDelete);
            }
            return RedirectToAction("Index");
        }

    }
}
