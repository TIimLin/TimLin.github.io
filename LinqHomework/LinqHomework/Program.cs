using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinqHomework
{
    class Program
    {
        static void Main(string[] args)
        {
            //影片資料集合
            List<Video> videoList = new List<Video>() {
                new Video() { Name = "天竺鼠車車", Country = "日本", Duration = 2.6, Type = "動漫" },
                new Video() { Name = "鬼滅之刃", Country = "日本", Duration = 25, Type = "動漫" },
                new Video() { Name = "鬼滅之刃-無限列車", Country = "日本", Duration = 100, Type = "電影" },
                new Video() { Name = "甜蜜家園SweetHome", Country = "韓國", Duration = 50, Type = "影集" },
                new Video() { Name = "The 100 地球百子", Country = "歐美", Duration = 48, Type = "影集" },
                new Video() { Name = "冰與火之歌Game of thrones", Country = "歐美", Duration = 60, Type = "影集" },
                new Video() { Name = "半澤直樹", Country = "日本", Duration = 40, Type = "影集" },
                new Video() { Name = "古魯家族：新石代", Country = "歐美", Duration = 90, Type = "電影" },
                new Video() { Name = "角落小夥伴電影版：魔法繪本裡的新朋友", Country = "日本", Duration = 77, Type = "電影" },
                new Video() { Name = "TENET天能", Country = "歐美", Duration = 80, Type = "電影" },
                new Video() { Name = "倚天屠龍記2019", Country = "中國", Duration = 58, Type = "影集" },
                new Video() { Name = "下一站是幸福", Country = "中國", Duration = 45, Type = "影集" },
            };

            //人物資料集合
            List<Person> personList = new List<Person>()
            {
                new Person() { Name = "Bill", CountryPrefer = new List<string>() { "中國", "日本" }, TypePrefer = new List<string>() { "影集" } },
                new Person() { Name = "Jimmy", CountryPrefer = new List<string>() { "日本" }, TypePrefer = new List<string>() { "動漫", "電影" } },
                new Person() { Name = "Andy", CountryPrefer = new List<string>() { "歐美", "日本" }, TypePrefer = new List<string>() { "影集", "電影" } },
            };

            // 1. 找出所有日本的影片名稱
            Console.WriteLine($"{Environment.NewLine}Q1: 找出所有日本的影片名稱");

            Console.WriteLine(string.Join(",", videoList.Where(x => x.Country == "日本").Select(x => x.Name)));

            // 2. 找出所有歐美的影片且類型為"影集"的影片名稱
            Console.WriteLine($"{Environment.NewLine}Q2: 找出所有歐美的影片且類型為'影集'的影片名稱");

            Console.WriteLine(String.Join(",", videoList.Where(x => x.Country == "歐美" && x.Type == "影集").Select(x => x.Name)));

            // 3. 是否有影片片長超過120分鐘的影片
            Console.WriteLine($"{Environment.NewLine}Q3: 是否有影片片長超過120分鐘的影片");

            Console.WriteLine(videoList.Any(x => x.Duration > 120) ? "是" : "否");

            // 4. 請列出所有人的名稱，並且用大寫英文表示，ex: Bill -> BILL
            Console.WriteLine($"{Environment.NewLine}Q4: 請列出所有人的名稱，並且用大寫英文表示");

            Console.WriteLine(string.Join(",", personList.Select(x => x.Name.ToUpper())));

            // 5. 將所有影片用片長排序(最長的在前)，並顯示排序過的排名以及片名，ex: No1: 天竺鼠車車
            Console.WriteLine($"{Environment.NewLine}Q5: 將所有影片用片長排序(最長的在前)，並顯示排序過的排名以及片名");

            Console.WriteLine(String.Join(Environment.NewLine, videoList.OrderByDescending(x => x.Duration).Select((x, index) => $"No.{index + 1}:{x.Name}")));

            // 6. 將所有影片進行以"類型"分類，並顯示以下樣式(注意縮排)
            /* 
            動漫:
                天竺鼠車車
                鬼滅之刃
            */
            Console.WriteLine($"{Environment.NewLine}Q6: 將所有影片進行以'類型'分類");
            #region Ans
            //Console.WriteLine(string.Join(Environment.NewLine, videoList.GroupBy(x => x.Type).Select(x => string.Join(Environment.NewLine, new List<string>() { x.Key }.Concat(x.Select(y => $"\t{y.Name}"))))));
            #endregion
            {
                var step1 = videoList.GroupBy(x => x.Type);
                var step2 = step1.Select(x =>
                {
                    var step2_1 = $"{x.Key}:";
                    var step2_2 = x.Select(y => $"\t{y.Name}");
                    var step2_3 = string.Join(Environment.NewLine, step2_2);
                    var step2_4 = $"{step2_1}{Environment.NewLine}{step2_3}";
                    return step2_4;
                });
                var step3 = string.Join(Environment.NewLine, step2);
                Console.WriteLine(step3);
            }
            // 7. 找到第一個喜歡歐美影片的人
            Console.WriteLine($"{Environment.NewLine}Q7: 找到第一個喜歡歐美影片的人");

            Console.WriteLine(personList.FirstOrDefault(x => x.CountryPrefer.Contains("歐美")).Name);

            // 8. 找到每個人喜歡的影片(根據國家以及類型)，ex: Bill: 半澤直樹, 倚天屠龍記2019, 下一站是幸福
            Console.WriteLine($"{Environment.NewLine}Q8: 找到每個人喜歡的影片");
            #region Ans
            //personList.ForEach(x =>
            //{
            //    Console.Write($"{x.Name}: ");
            //    Console.WriteLine(string.Join(", ", videoList.Where(y => x.CountryPrefer.Contains(y.Country) && x.TypePrefer.Contains(y.Type)).Select(z => z.Name)));
            //});

            //Console.WriteLine(
            //    string.Join(
            //        Environment.NewLine,
            //        personList.Select(x => $"{x.Name}: {string.Join("、", videoList.Where(y => x.CountryPrefer.Contains(y.Country) && x.TypePrefer.Contains(y.Type)).Select(z => z.Name))}")
            //    )
            //);
            #endregion
            {
                var step1 = personList.Select(x =>
                {
                    var step1_1 = $"{x.Name}:";
                    var step1_2 = videoList.Where(y => x.CountryPrefer.Contains(y.Country) && x.TypePrefer.Contains(y.Type));
                    var step1_3 = step1_2.Select(y => y.Name);
                    var step1_4 = string.Join(",", step1_3);
                    var step1_5 = $"{step1_1}{step1_4}";
                    return step1_5;
                });
                var step2=string.Join(Environment.NewLine,step1);
                Console.WriteLine(step2);

                Console.WriteLine(string.Join(Environment.NewLine,personList.Select(person=>$"{person.Name}:{string.Join(",",videoList.Where(video=>person.CountryPrefer.Contains(video.Country)&&person.TypePrefer.Contains(video.Type)).Select(v=>v.Name))}")));
            }
            // 9. 列出所有類型的影片總時長，ex: 動漫: 100min
            Console.WriteLine($"{Environment.NewLine}Q9: 列出所有類型的影片總時長");

            Console.WriteLine(String.Join(",", videoList.GroupBy(x => x.Type).Select(x => $"{x.Key}:{x.Sum(y => y.Duration)}min")));

            // 10. 列出所有國家出產的影片數量，ex: 日本: 3部
            Console.WriteLine($"{Environment.NewLine}Q10: 列出所有國家出產的影片數量");

            Console.WriteLine(string.Join(",", videoList.GroupBy(x => x.Country).Select(x => $"{x.Key}:{x.Count()}部")));

            Console.ReadLine();
        }
    }
}
