﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class TaskModal
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public Boolean IsCompleted { get; set; }
    }
}
