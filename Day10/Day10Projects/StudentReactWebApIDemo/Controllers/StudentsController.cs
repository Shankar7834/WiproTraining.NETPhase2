using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentReactWebApIDemo.Data;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent([FromForm] StudentDto studentDto)
        {
            var student = new Student
            {
                Name = studentDto.Name,
                Email = studentDto.Email,
                Address = studentDto.Address
            };

            if (studentDto.ImageFile != null)
            {
                var filePath = Path.Combine("wwwroot/images", Guid.NewGuid() + Path.GetExtension(studentDto.ImageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.ImageFile.CopyToAsync(stream);
                }
                student.ImageUrl = filePath.Replace("wwwroot", "");
            }

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, [FromForm] StudentDto studentDto)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = studentDto.Name;
            student.Email = studentDto.Email;
            student.Address = studentDto.Address;

            if (studentDto.ImageFile != null)
            {
                var filePath = Path.Combine("wwwroot/images", Guid.NewGuid() + Path.GetExtension(studentDto.ImageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.ImageFile.CopyToAsync(stream);
                }
                student.ImageUrl = filePath.Replace("wwwroot", "");
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }



    }
}
