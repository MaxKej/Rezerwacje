using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace Repository.Concrete
{
    public class BaseRepository
    {
        protected AppDbContext Context;

        public BaseRepository(AppDbContext context)
        {
            //Context = AppDbContext.Create();
            Context = context;
        }
    }
}
