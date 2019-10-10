# Djangoでハマったところ

## Qiita(Djangoを最速マスターPart1)
### models.py
- 外部キー参照
  - 1対多
  - 引数が足りなかった(Django .ver > 2.0)
```python
×author = models.ForeignKey('auth.User')

〇author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
```

### databaseをいじるとき

- 下記でpythonのインタラクティブモ―ドが開く

```console
> python manage.py shell
```
- ipythonをインストールすると補完機能や分からない変数の調査が強いので楽になる
- 事前に作成しているモデルを読み込むときの注意点

```python
from manager.models import Person, Manager, Worker
```

上記のmanager.modelsはsetting.pyで追記したもの
つまり、今回のケースでは

```python
from shift_app.models import Person, Manager, Worker
```
まぁ、普通に考えたら当たり前のことだった。

idが201番以上のデータベースがない