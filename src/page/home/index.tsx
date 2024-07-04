import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {ICampaign} from '../../types/campaign'
import {Delete} from '@mui/icons-material'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Home = () => {
  const [value, setValue] = useState(1)
  const [data, setData] = useState<ICampaign>({
    campaign: {
      information: {name: '', describe: ''},
      subCampaigns: [
        {
          name: 'Chiến dịch con 1',
          status: true,
          ads: [{quantity: 0, name: 'Quảng cáo 1'}],
        },
      ],
    },
  })
  const [subCampaignActive, setSubCampaignActive] = useState(0)
  const [isValidate, setIsValidate] = useState(false)
  const [selectItemAds, setSelectItemAds] = useState<number[]>([])

  useEffect(() => {
    setSelectItemAds([])
  }, [subCampaignActive])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleAddRow = () => {
    data.campaign.subCampaigns[subCampaignActive].ads.push({
      name: `Quảng cáo ${
        data.campaign.subCampaigns[subCampaignActive].ads.length + 1
      }`,
      quantity: 0,
    })
    setData({...data})
  }

  const handleAddSubCampaign = () => {
    data.campaign.subCampaigns.push({
      name: `Chiến dịch con ${data.campaign.subCampaigns.length + 1}`,
      status: true,
      ads: [{quantity: 0, name: 'Quảng cáo 1'}],
    })
    setSubCampaignActive(data.campaign.subCampaigns.length - 1)
    setData({...data})
  }

  const handleDeleteRow = (index: number) => {
    const newRows = data.campaign.subCampaigns[subCampaignActive].ads.filter(
      (_, i) => i !== index
    )
    data.campaign.subCampaigns[subCampaignActive].ads = [...newRows]
    setData({...data})
  }

  const onchangeSubCampaign = (e: any) => {
    data.campaign.subCampaigns[subCampaignActive].name = e.target.value
    setData({...data})
  }

  const onChangeInfoCampaign = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.campaign.information[`${e.target.name}`] = e.target.value
    setData({...data})
  }

  const handleChangeSubCampaignStatus = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    data.campaign.subCampaigns[subCampaignActive].status = e.target.checked
    setData({...data})
  }

  const handleChangeSelectAds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'all') {
      if (
        selectItemAds.length <
        data.campaign.subCampaigns[subCampaignActive].ads.length
      ) {
        const newArray: number[] = []
        data.campaign.subCampaigns[subCampaignActive].ads.forEach(
          (_item: any, index) => {
            newArray.push(index)
          }
        )
        setSelectItemAds([...newArray])
      } else {
        setSelectItemAds([])
      }
    } else {
      if (!selectItemAds.includes(Number(e.target.name))) {
        setSelectItemAds([...selectItemAds, Number(e.target.name)])
      } else {
        const newArray = selectItemAds.filter(
          (item) => item !== Number(e.target.name)
        )
        setSelectItemAds([...newArray])
      }
    }
  }

  const onchangeAdsInSubCampaignInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    data.campaign.subCampaigns[subCampaignActive].ads[index][
      `${e.target.name}`
    ] = e.target.value
    setData({...data})
  }

  const checkErrorData = () => {
    if (!data.campaign.information.name) {
      return true
    } else if (data.campaign.subCampaigns.find((item) => !item.name)) {
      return true
    }
    const {subCampaigns} = data.campaign

    for (let i = 0; i < subCampaigns.length; i++) {
      const ads = subCampaigns[i].ads
      if (!subCampaigns[i].name) {
        return true
      }
      for (let j = 0; j < ads.length; j++) {
        const ad = ads[j]
        if (!ad.quantity || !ad.name) {
          return true
        }
      }
    }
    return false
  }

  const validateInput = (value: any) => {
    if (isValidate) {
      if (value) {
        return false
      } else return true
    } else return false
  }

  const validateNameSubCampaign = (subCampaigns: {
    name: string
    status: boolean
    ads: {
      [key: string]: any
      name: string
      quantity: number
    }[]
  }) => {
    if (isValidate) {
      if (!subCampaigns.name) {
        return true
      } else {
        for (let j = 0; j < subCampaigns.ads.length; j++) {
          const ad = subCampaigns.ads[j]
          if (!ad.quantity || !ad.name) {
            return true
          }
        }
      }
    } else return false
  }

  const hideHeaderTable = () => {
    if (selectItemAds.length > 0) {
      return true
    } else return false
  }

  const submitForm = () => {
    if (checkErrorData()) {
      window.alert(`Vui lòng điền đúng và đầy đủ thông tin`)
    } else {
      window.alert(`Thêm thành công chiến dịch\n ${JSON.stringify(data)}`)
    }
    setIsValidate(true)
  }
  const handleDeleteMany = () => {
    const newArray = data.campaign.subCampaigns[subCampaignActive].ads.filter(
      (_item: any, index) => !selectItemAds.includes(index)
    )
    data.campaign.subCampaigns[subCampaignActive].ads = [...newArray]
    setData({...data})
    setSelectItemAds([])
  }

  return (
    <Box>
      <Box paddingTop={'20px'}>
        <Box
          px={'20px'}
          py={'10px'}
          display={'flex'}
          justifyContent={'end'}
          borderBottom={1}
        >
          <Button
            variant='contained'
            style={{backgroundColor: '#3f51b5'}}
            onClick={submitForm}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>

      <Box padding={'24px'}>
        <Box
          boxShadow={`0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`}
        >
          <Tabs
            style={{borderBottom: '1px solid rgb(224, 224, 224)'}}
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='THÔNG TIN' {...a11yProps(0)} />
            <Tab label='CHIẾN DỊCH CON' {...a11yProps(1)} />
          </Tabs>

          {value === 0 && (
            <Box
              padding={'24px'}
              display={'flex'}
              flexDirection={'column'}
              gap={'24px'}
            >
              <TextField
                required
                id='name'
                name='name'
                label='Tên chiến dịch'
                variant='standard'
                fullWidth
                value={data.campaign.information.name}
                error={validateInput(data.campaign.information.name)}
                onChange={onChangeInfoCampaign}
              />

              <TextField
                id='describe'
                name='describe'
                label='Mô tả'
                variant='standard'
                fullWidth
                onChange={onChangeInfoCampaign}
              />
            </Box>
          )}
          {value === 1 && (
            <Box
              padding={'16px'}
              display={'flex'}
              flexDirection={'column'}
              gap={'16px'}
            >
              <Box display={'flex'} gap={'16px'} alignItems={'start'}>
                <IconButton
                  style={{background: 'rgb(237, 237, 237)'}}
                  aria-label='add'
                  onClick={handleAddSubCampaign}
                >
                  <AddIcon color='error' />
                </IconButton>
                {data.campaign.subCampaigns.map((item, index) => (
                  <Card
                    sx={{
                      width: 214,
                      height: 124,
                      boxSizing: 'border-box',
                      border:
                        index === subCampaignActive
                          ? '2px solid rgb(33, 150, 243)'
                          : '',
                    }}
                    key={item.name + index}
                  >
                    <CardActionArea
                      onClick={() => setSubCampaignActive(index)}
                      style={{padding: 0, margin: 0, height: '100%'}}
                    >
                      <CardContent style={{padding: '8px'}}>
                        <Box
                          display={'flex'}
                          alignItems={'end'}
                          justifyContent={'center'}
                        >
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              wordBreak: 'break-all',
                              fontSize: '20px',
                              color: !validateNameSubCampaign(item)
                                ? 'black'
                                : 'red',
                            }}
                          >
                            {item.name}
                          </span>
                          <span>
                            <CheckCircleIcon
                              style={{width: '16px', maxHeight: '16px'}}
                              color={
                                data.campaign.subCampaigns[index].status
                                  ? 'success'
                                  : 'disabled'
                              }
                            />
                          </span>
                        </Box>

                        <Tooltip title='Số lượng' placement='left' arrow>
                          <p
                            style={{
                              fontSize: '24px',
                              textAlign: 'center',
                              padding: '8px',
                              paddingLeft: 0,
                              margin: 0,
                            }}
                          >
                            {Number(
                              data.campaign.subCampaigns[index].ads
                                .map((item) => item.quantity)
                                .reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue,
                                  0
                                )
                            )}
                          </p>
                        </Tooltip>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              <Box display={'flex'} alignItems={'center'}>
                <TextField
                  required
                  id='standard-required'
                  label='Tên chiến dịch con'
                  variant='standard'
                  style={{width: '60%'}}
                  value={data.campaign.subCampaigns[subCampaignActive].name}
                  onChange={onchangeSubCampaign}
                  error={validateInput(
                    data.campaign.subCampaigns[subCampaignActive].name
                  )}
                />

                <Box width={'40%'} display={'flex'} justifyContent={'center'}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        color='primary'
                        checked={
                          data.campaign.subCampaigns[subCampaignActive].status
                        }
                        onChange={handleChangeSubCampaignStatus}
                      />
                    }
                    label='Đang hoạt động'
                  />
                </Box>
              </Box>

              <Box>
                <p style={{fontSize: '20px'}}>DANH SÁCH QUẢNG CÁO</p>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={
                              selectItemAds.length ===
                              data.campaign.subCampaigns[subCampaignActive].ads
                                .length
                                ? true
                                : false
                            }
                            indeterminate={
                              selectItemAds.length <
                                data.campaign.subCampaigns[subCampaignActive]
                                  .ads.length && selectItemAds.length !== 0
                                ? true
                                : false
                            }
                            name='all'
                            onChange={handleChangeSelectAds}
                          />
                        </TableCell>
                        <TableCell>
                          {hideHeaderTable() ? (
                            <Tooltip title='Xoá'>
                              <IconButton onClick={handleDeleteMany}>
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            'Tên quảng cáo*'
                          )}
                        </TableCell>
                        <TableCell>
                          {hideHeaderTable() ? '' : 'Số lượng*'}
                        </TableCell>
                        <TableCell style={{textAlign: 'end'}}>
                          <Button
                            variant='outlined'
                            startIcon={<AddIcon />}
                            onClick={handleAddRow}
                          >
                            Thêm
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.campaign.subCampaigns[subCampaignActive].ads.map(
                        (row, index) => (
                          <TableRow
                            key={index}
                            hover
                            style={{
                              background: selectItemAds.includes(index)
                                ? 'rgba(245, 0, 87, 0.08)'
                                : '',
                            }}
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={
                                  selectItemAds.includes(index) ? true : false
                                }
                                onChange={handleChangeSelectAds}
                                name={index.toString()}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name='name'
                                value={row.name}
                                onChange={(event: any) =>
                                  onchangeAdsInSubCampaignInfo(event, index)
                                }
                                fullWidth
                                variant='standard'
                                error={validateInput(row.name)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name='quantity'
                                type='number'
                                value={row.quantity}
                                onChange={(event: any) =>
                                  onchangeAdsInSubCampaignInfo(event, index)
                                }
                                fullWidth
                                variant='standard'
                                error={validateInput(row.quantity)}
                              />
                            </TableCell>
                            <TableCell
                              padding='checkbox'
                              style={{textAlign: 'end'}}
                            >
                              <Tooltip title='Xoá'>
                                <IconButton
                                  onClick={() => handleDeleteRow(index)}
                                  disabled={selectItemAds.length > 0}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
