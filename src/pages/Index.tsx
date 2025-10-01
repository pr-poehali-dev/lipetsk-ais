import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YandexMap from '@/components/YandexMap';

const Index = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const activities = [
    {
      id: 1,
      name: 'Спортивная гимнастика',
      organization: 'ДЮСШ №1',
      district: 'Правобережный',
      category: 'Спорт',
      age: '5-7 лет',
      price: 'Бесплатно',
      time: 'Вечер',
      address: 'ул. Ленина, 45',
      schedule: 'ПН, СР, ПТ 17:00-18:30',
      phone: '+7 (4742) 12-34-56',
      coordinates: [52.6088, 39.5993] as [number, number]
    },
    {
      id: 2,
      name: 'Робототехника',
      organization: 'ДТ "Квант"',
      district: 'Левобережный',
      category: 'Техника',
      age: '8-12 лет',
      price: '2000 руб/мес',
      time: 'Вечер',
      address: 'пр. Победы, 12',
      schedule: 'ВТ, ЧТ 16:00-17:30',
      phone: '+7 (4742) 23-45-67',
      coordinates: [52.5820, 39.5423] as [number, number]
    },
    {
      id: 3,
      name: 'Вокальная студия',
      organization: 'ДШИ №4',
      district: 'Центральный',
      category: 'Творчество',
      age: '6-10 лет',
      price: '1500 руб/мес',
      time: 'Утро',
      address: 'ул. Гагарина, 78',
      schedule: 'СБ, ВС 10:00-12:00',
      phone: '+7 (4742) 34-56-78',
      coordinates: [52.6150, 39.5890] as [number, number]
    },
    {
      id: 4,
      name: 'Шахматный клуб',
      organization: 'ДЮЦ "Стратег"',
      district: 'Правобережный',
      category: 'Наука',
      age: '7-14 лет',
      price: 'Бесплатно',
      time: 'Выходные',
      address: 'ул. Московская, 23',
      schedule: 'СБ 14:00-16:00',
      phone: '+7 (4742) 45-67-89',
      coordinates: [52.6070, 39.6020] as [number, number]
    },
    {
      id: 5,
      name: 'Танцевальная студия',
      organization: 'ДК "Октябрь"',
      district: 'Левобережный',
      category: 'Творчество',
      age: '5-12 лет',
      price: '1800 руб/мес',
      time: 'Вечер',
      address: 'пр. Мира, 56',
      schedule: 'ПН, СР, ПТ 18:00-19:30',
      phone: '+7 (4742) 56-78-90',
      coordinates: [52.5900, 39.5500] as [number, number]
    },
    {
      id: 6,
      name: 'Футбольная секция',
      organization: 'СДЮШОР "Металлург"',
      district: 'Центральный',
      category: 'Спорт',
      age: '6-16 лет',
      price: 'Бесплатно',
      time: 'Вечер',
      address: 'ул. Спортивная, 10',
      schedule: 'ВТ, ЧТ, СБ 17:00-19:00',
      phone: '+7 (4742) 67-89-01',
      coordinates: [52.6120, 39.5950] as [number, number]
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || activity.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesAge = selectedAge === 'all' || activity.age === selectedAge;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && activity.price === 'Бесплатно') ||
                        (selectedPrice === 'paid' && activity.price !== 'Бесплатно');
    const matchesTime = selectedTime === 'all' || activity.time === selectedTime;
    
    return matchesSearch && matchesDistrict && matchesCategory && matchesAge && matchesPrice && matchesTime;
  });

  const favoriteActivities = activities.filter(activity => favorites.includes(activity.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Секции и кружки Липецка</h1>
                <p className="text-xs text-muted-foreground">Автоматизированная информационная система</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0">
              <TabsTrigger 
                value="main" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger 
                value="search" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="Search" size={18} className="mr-2" />
                Поиск
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="Map" size={18} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="Calendar" size={18} className="mr-2" />
                Мои записи
              </TabsTrigger>
              <TabsTrigger 
                value="favorites" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{favorites.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="help" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                <Icon name="HelpCircle" size={18} className="mr-2" />
                Помощь
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <TabsContent value="main" className="mt-0">
            <div className="space-y-8">
              <section className="relative bg-gradient-to-br from-primary to-primary/80 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: 'url(https://cdn.poehali.dev/files/371e05f6-e73f-4a55-8306-02dc4bcac750.jpg)',
                    filter: 'brightness(0.4)'
                  }}
                />
                <div className="relative z-10 p-8">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">АИС «Секции и кружки Липецка»</h2>
                    <p className="text-lg mb-6 text-white drop-shadow-md">
                      Автоматизированная информационная система для записи детей в секции и кружки. 
                      Умный поиск по параметрам, интерактивная карта организаций и электронная запись онлайн.
                    </p>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      onClick={() => setActiveTab('search')}
                      className="font-semibold"
                    >
                      Начать поиск
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Популярные направления</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Спорт', 'Творчество', 'Наука', 'Техника'].map((category) => (
                    <Card 
                      key={category} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => {
                        setSelectedCategory(category);
                        setActiveTab('search');
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <Icon 
                            name={category === 'Спорт' ? 'Trophy' : category === 'Творчество' ? 'Palette' : category === 'Наука' ? 'Microscope' : 'Cpu'} 
                            className="text-primary" 
                            size={24} 
                          />
                        </div>
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <CardDescription>
                          {activities.filter(a => a.category === category).length} кружков
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Недавно добавленные</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.slice(0, 3).map((activity) => (
                    <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{activity.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleFavorite(activity.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={18} 
                              className={favorites.includes(activity.id) ? 'fill-red-500 text-red-500' : ''} 
                            />
                          </Button>
                        </div>
                        <CardTitle className="text-lg">{activity.name}</CardTitle>
                        <CardDescription>{activity.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="MapPin" size={16} />
                            <span>{activity.district}, {activity.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Clock" size={16} />
                            <span>{activity.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Users" size={16} />
                            <span>{activity.age}</span>
                          </div>
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <Icon name="Wallet" size={16} />
                            <span>{activity.price}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          Записаться
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-0">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Умный поиск</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Поиск по названию или организации</label>
                    <div className="relative">
                      <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Введите название кружка или организации..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Район</label>
                      <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все районы</SelectItem>
                          <SelectItem value="Правобережный">Правобережный</SelectItem>
                          <SelectItem value="Левобережный">Левобережный</SelectItem>
                          <SelectItem value="Центральный">Центральный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Направление</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все направления</SelectItem>
                          <SelectItem value="Спорт">Спорт</SelectItem>
                          <SelectItem value="Творчество">Творчество</SelectItem>
                          <SelectItem value="Наука">Наука</SelectItem>
                          <SelectItem value="Техника">Техника</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Возраст</label>
                      <Select value={selectedAge} onValueChange={setSelectedAge}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Любой возраст</SelectItem>
                          <SelectItem value="5-7 лет">5-7 лет</SelectItem>
                          <SelectItem value="6-10 лет">6-10 лет</SelectItem>
                          <SelectItem value="7-14 лет">7-14 лет</SelectItem>
                          <SelectItem value="8-12 лет">8-12 лет</SelectItem>
                          <SelectItem value="6-16 лет">6-16 лет</SelectItem>
                          <SelectItem value="5-12 лет">5-12 лет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Стоимость</label>
                      <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Любая</SelectItem>
                          <SelectItem value="free">Бесплатно</SelectItem>
                          <SelectItem value="paid">Платные</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Время занятий</label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Любое время</SelectItem>
                          <SelectItem value="Утро">Утро</SelectItem>
                          <SelectItem value="Вечер">Вечер</SelectItem>
                          <SelectItem value="Выходные">Выходные</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedDistrict('all');
                          setSelectedCategory('all');
                          setSelectedAge('all');
                          setSelectedPrice('all');
                          setSelectedTime('all');
                        }}
                      >
                        Сбросить фильтры
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Найдено: {filteredActivities.length} {filteredActivities.length === 1 ? 'кружок' : 'кружков'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredActivities.map((activity) => (
                    <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{activity.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleFavorite(activity.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={18} 
                              className={favorites.includes(activity.id) ? 'fill-red-500 text-red-500' : ''} 
                            />
                          </Button>
                        </div>
                        <CardTitle className="text-lg">{activity.name}</CardTitle>
                        <CardDescription>{activity.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="MapPin" size={16} />
                            <span>{activity.district}, {activity.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Clock" size={16} />
                            <span>{activity.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Users" size={16} />
                            <span>{activity.age}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Phone" size={16} />
                            <span>{activity.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <Icon name="Wallet" size={16} />
                            <span>{activity.price}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          Записаться
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredActivities.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Ничего не найдено</h3>
                    <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Интерактивная карта организаций</CardTitle>
                <CardDescription>Все секции и кружки Липецка на карте. Нажмите на метку, чтобы увидеть информацию</CardDescription>
              </CardHeader>
              <CardContent>
                <YandexMap 
                  activities={activities}
                  onActivitySelect={(activity) => {
                    console.log('Selected activity:', activity);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Мои записи</CardTitle>
                <CardDescription>История ваших записей в секции и кружки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">У вас пока нет записей</h3>
                  <p className="text-muted-foreground mb-4">Запишитесь в понравившийся кружок, чтобы увидеть его здесь</p>
                  <Button onClick={() => setActiveTab('search')}>
                    Найти кружок
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">Избранные кружки</h3>
                <p className="text-muted-foreground">
                  {favoriteActivities.length === 0 ? 'Вы пока не добавили кружки в избранное' : `Добавлено: ${favoriteActivities.length}`}
                </p>
              </div>

              {favoriteActivities.length === 0 ? (
                <Card>
                  <CardContent className="pt-12 pb-12">
                    <div className="text-center">
                      <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Избранное пусто</h3>
                      <p className="text-muted-foreground mb-4">Добавляйте интересные кружки в избранное для быстрого доступа</p>
                      <Button onClick={() => setActiveTab('search')}>
                        Найти кружки
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteActivities.map((activity) => (
                    <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{activity.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleFavorite(activity.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={18} 
                              className="fill-red-500 text-red-500" 
                            />
                          </Button>
                        </div>
                        <CardTitle className="text-lg">{activity.name}</CardTitle>
                        <CardDescription>{activity.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="MapPin" size={16} />
                            <span>{activity.district}, {activity.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Clock" size={16} />
                            <span>{activity.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Users" size={16} />
                            <span>{activity.age}</span>
                          </div>
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <Icon name="Wallet" size={16} />
                            <span>{activity.price}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          Записаться
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="help" className="mt-0">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Помощь и инструкции</CardTitle>
                  <CardDescription>Как пользоваться системой</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Search" size={20} className="text-primary" />
                      Как найти подходящий кружок?
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-7">
                      <li>Перейдите на вкладку "Поиск"</li>
                      <li>Используйте фильтры для уточнения параметров</li>
                      <li>Просмотрите список найденных кружков</li>
                      <li>Добавьте понравившиеся в избранное</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      Как записаться в кружок?
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-7">
                      <li>Найдите интересующий кружок</li>
                      <li>Нажмите кнопку "Записаться"</li>
                      <li>Заполните форму с данными ребёнка</li>
                      <li>Дождитесь подтверждения от организации</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Map" size={20} className="text-primary" />
                      Как использовать карту?
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-7">
                      <li>Откройте вкладку "Карта"</li>
                      <li>Нажмите на значок организации</li>
                      <li>Просмотрите список кружков в этом месте</li>
                      <li>Выберите подходящий и запишитесь</li>
                    </ol>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-lg mb-3">Контакты поддержки</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={18} />
                        <span>+7 (4742) 00-00-00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" size={18} />
                        <span>support@lipetsk-kruzhki.ru</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={18} />
                        <span>Пн-Пт: 9:00-18:00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;